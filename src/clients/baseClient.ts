import axios, { AxiosInstance } from 'axios';
import { Authentication, Telemetry, TelemetryClient } from 'telemetry.jira.js';
import type { Client } from './client';
import type { Callback } from '../callback';
import type { Config } from '../config';
import { AuthenticationService } from '../services/authenticationService';
import type { RequestConfig } from '../requestConfig';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';
const ATLASSIAN_TOKEN_CHECK_FLAG = 'X-Atlassian-Token';
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = 'no-check';

export class BaseClient implements Client {
  private instance: AxiosInstance;
  private telemetryClient: TelemetryClient;

  constructor(protected readonly config: Config) {
    this.telemetryClient = new TelemetryClient(config.telemetry);
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
        return undefined;
      }

      if (Array.isArray(value)) {
        // eslint-disable-next-line no-param-reassign
        value = value.join(',');
      }

      if (value instanceof Date) {
        // eslint-disable-next-line no-param-reassign
        value = value.toISOString();
      } else if (value !== null && typeof value === 'object') {
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);

      return undefined;
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

  async sendRequest<T>(requestConfig: RequestConfig, callback: never, telemetryData?: Partial<Telemetry>): Promise<T>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>, telemetryData?: Partial<Telemetry>): Promise<void>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T> | never, telemetryData?: Partial<Telemetry>): Promise<void | T> {
    const startDateTime = new Date();

    const telemetry: Telemetry = {
      authentication: this.authenticationType,
      baseRequestConfigUsed: !!this.config.baseRequestConfig,
      bodyExists: !!requestConfig.data,
      callbackUsed: !!callback,
      headersExists: !!requestConfig.headers,
      libVersion: '2.3.0',
      libVersionHash: 'ae14c21d807ec17e583ca3b6c2097de5',
      methodName: telemetryData?.methodName || 'sendRequest',
      onErrorMiddlewareUsed: !!this.config.middlewares?.onError,
      onResponseMiddlewareUsed: !!this.config.middlewares?.onResponse,
      queryExists: !!requestConfig.params,
      requestEndTime: new Date(),
      requestStartTime: startDateTime,
      requestStatusCode: 0,
      strict_GDPR_enabled: !!this.config.strictGDPR,
      noCheckAtlassianToken: !!this.config.noCheckAtlassianToken,
      ...telemetryData,
    };

    try {
      const modifiedRequestConfig = {
        ...requestConfig,
        headers: this.removeUndefinedProperties({
          Authorization: await AuthenticationService.getAuthenticationToken(this.config.authentication, {
            baseURL: this.config.host,
            url: this.instance.getUri(requestConfig),
            method: requestConfig.method!,
          }),
          ...requestConfig.headers,
        }),
      };

      const response = await this.instance.request(modifiedRequestConfig);

      const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.config.middlewares?.onResponse?.(response.data);

      telemetry.requestStatusCode = response.status;

      return responseHandler(response.data);
    } catch (e) {
      const callbackErrorHandler = callback && ((error: Config.Error) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(e);

      telemetry.requestStatusCode = e.isAxiosError ? e.response?.status ?? 0 : 418;

      return errorHandler(e);
    } finally {
      telemetry.requestEndTime = new Date();

      this.telemetryClient.sendTelemetry(telemetry);
    }
  }

  private get authenticationType(): Authentication {
    const { authentication } = this.config;

    if (!authentication) {
      return Authentication.None;
    }

    if (authentication.basic) {
      return Authentication.Basic;
    }

    if (authentication.oauth) {
      return Authentication.OAuth;
    }

    if (authentication.oauth2) {
      return Authentication.OAuth2;
    }

    if (authentication.jwt) {
      return Authentication.JWT;
    }

    return Authentication.NA;
  }
}
