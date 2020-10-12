/* eslint-disable lines-between-class-members */

import axios, { AxiosInstance } from 'axios';
import { Client } from './client';
import { Callback } from '../callback';
import { ClientConfig } from '../clientConfig';
import { AuthenticationService } from '../services/authenticationService';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';

export class BaseClient implements Client {
  private instance: AxiosInstance;

  constructor(protected readonly clientConfig: ClientConfig) {
    this.instance = axios.create({
      paramsSerializer: this.paramSerializer,
      ...clientConfig.baseRequestConfig,
      baseURL: clientConfig.host,
      headers: this.removeUndefinedValues({
        [STRICT_GDPR_FLAG]: clientConfig.strictGDPR,
        ...clientConfig.baseRequestConfig?.headers,
      }),
    });
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const modifiedParameters = Object.entries(parameters)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, value.join(',')];
        }

        return [key, value];
      })
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});

    return axios.defaults.paramsSerializer?.(modifiedParameters) ?? '';
  }

  protected removeUndefinedValues(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([, value]) => typeof value !== 'undefined')
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
  }

  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback?: undefined): Promise<T>;
  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback: Callback<T>): Promise<void>;
  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback?: Callback<T>): Promise<void | T> {
    try {
      const modifiedRequestConfig = {
        ...requestConfig,
        headers: this.removeUndefinedValues({
          Authorization: AuthenticationService.getAuthenticationToken(this.clientConfig.authentication),
          ...requestConfig.headers,
        }),
      };

      const response = await this.instance.request(modifiedRequestConfig);

      const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.clientConfig.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e) {
      const callbackErrorHandler = callback && ((error: ClientConfig.Error) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.clientConfig.middlewares?.onError?.(e);

      return errorHandler(e);
    }
  }
}
