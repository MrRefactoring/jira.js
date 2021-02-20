import axios, { AxiosInstance } from 'axios';
import { Client } from './client';
import { Callback } from '../callback';
import { Config } from '../config';
import { AuthenticationService } from '../services/authenticationService';
import { RequestConfig } from '../requestConfig';
// import { TelemetryClient } from 'telemetry.jira.js';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';

export class BaseClient implements Client {
  private instance: AxiosInstance;
  // private telemetryClient: TelemetryClient;

  constructor(protected readonly config: Config) {
    this.instance = axios.create({
      paramsSerializer: this.paramSerializer,
      ...config.baseRequestConfig,
      baseURL: config.host,
      headers: this.removeUndefinedProperties({
        [STRICT_GDPR_FLAG]: config.strictGDPR,
        ...config.baseRequestConfig?.headers,
      }),
    });

    // this.telemetryClient = new TelemetryClient();
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

  async sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T> | undefined, telemetryData?: Partial<any>): Promise<T>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>, telemetryData?: Partial<any>): Promise<void>;
  async sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>, telemetryData?: Partial<any>): Promise<void | T> {
    // let requestSendedSuccessfully = true;

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

      return responseHandler(response.data);
    } catch (e) {
      // requestSendedSuccessfully = false;

      const callbackErrorHandler = callback && ((error: Config.Error) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(e);

      return errorHandler(e);
    } finally {
      console.log(telemetryData);
      // this.telemetryClient.sendTelemetry({
      //   success: requestSendedSuccessfully,
      // }, this.Config.telemetry);
    }
  }
}
