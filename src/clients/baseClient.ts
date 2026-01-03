/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { Callback } from '../callback';
import type { Client } from './client';
import type { Config, JiraError } from '../config';
import { ConfigSchema } from '../config';
import { getAuthenticationToken } from '../services/authenticationService';
import type { RequestConfig } from '../requestConfig';
import { HttpException, isObject } from './httpException';
import { ZodError } from 'zod';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';
const ATLASSIAN_TOKEN_CHECK_FLAG = 'X-Atlassian-Token';
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = 'no-check';

export class BaseClient implements Client {
  private instance: AxiosInstance;

  constructor(protected readonly config: Config) {
    try {
      this.config = ConfigSchema.parse(config);
    } catch (e) {
      if (e instanceof ZodError && e.issues[0].message === 'Invalid URL') {
        throw new Error(
          'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?',
        );
      }

      throw e;
    }

    this.instance = axios.create({
      paramsSerializer: this.paramSerializer.bind(this),
      ...config.baseRequestConfig,
      baseURL: config.host,
      headers: this.removeUndefinedProperties({
        [STRICT_GDPR_FLAG]: config.strictGDPR,
        [ATLASSIAN_TOKEN_CHECK_FLAG]: config.noCheckAtlassianToken ? ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE : undefined,
        ...config.baseRequestConfig?.headers,
      }),
    });
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const parts: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || typeof value === 'undefined') {
        return;
      }

      if (Array.isArray(value)) {
        value = value.join(',');
      }

      if (value instanceof Date) {
        value = value.toISOString();
      } else if (value !== null && typeof value === 'object') {
        value = JSON.stringify(value);
      } else if (value instanceof Function) {
        const part = value();

        return part && parts.push(part);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);
    });

    return parts.join('&');
  }

  protected encode(value: string) {
    return encodeURIComponent(value)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  protected removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([, value]) => typeof value !== 'undefined')
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
  }

  async sendRequest<T>(requestConfig: RequestConfig, callback: never): Promise<T>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>): Promise<void>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T> | never): Promise<void | T> {
    try {
      const response = await this.sendRequestFullResponse<T>(requestConfig);

      return this.handleSuccessResponse(response.data, callback);
    } catch (e: unknown) {
      return this.handleFailedResponse(e, callback);
    }
  }

  async sendRequestFullResponse<T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>> {
    const modifiedRequestConfig = {
      ...requestConfig,
      headers: this.removeUndefinedProperties({
        Authorization: await getAuthenticationToken(this.config.authentication),
        ...requestConfig.headers,
      }),
    };

    return this.instance.request<T>(modifiedRequestConfig);
  }

  handleSuccessResponse<T>(response: any, callback?: Callback<T> | never): T | void {
    const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
    const defaultResponseHandler = (data: T): T => data;

    const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

    this.config.middlewares?.onResponse?.(response.data);

    return responseHandler(response);
  }

  handleFailedResponse<T>(e: unknown, callback?: Callback<T> | never): void {
    const err = this.buildErrorHandlingResponse(e);

    const callbackErrorHandler = callback && ((error: JiraError) => callback(error));
    const defaultErrorHandler = (error: JiraError) => {
      throw error;
    };

    const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

    this.config.middlewares?.onError?.(err);

    return errorHandler(err);
  }

  private buildErrorHandlingResponse(e: unknown): JiraError {
    if (axios.isAxiosError(e) && e.response) {
      return new HttpException(
        {
          code: e.code,
          message: e.message,
          data: e.response.data,
          status: e.response.status,
          statusText: e.response.statusText,
        },
        e.response.status,
        { cause: e },
      );
    }

    if (axios.isAxiosError(e)) {
      return e;
    }

    if (isObject(e) && isObject((e as Record<string, any>).response)) {
      return new HttpException((e as Record<string, any>).response);
    }

    if (e instanceof Error) {
      return new HttpException(e);
    }

    return new HttpException('Unknown error occurred.', 500, { cause: e });
  }
}
