/* eslint-disable lines-between-class-members */

import axios, { AxiosInstance } from 'axios';
import { Client } from '../client';
import { Callback } from '../callback';
import { ClientConfig } from '../clientConfig';

export class BaseClient implements Client {
  private instance: AxiosInstance;

  constructor(protected readonly clientConfig: ClientConfig) {
    this.instance = axios.create({
      ...clientConfig.baseRequestConfig,
      baseURL: clientConfig.host,
    });
  }

  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback?: undefined): Promise<T>;
  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback: Callback<T>): Promise<void>;
  async sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback?: Callback<T>): Promise<void | T> {
    try {
      const response = await this.instance.request(requestConfig);

      const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.clientConfig.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e) {
      const callbackErrorHandler = callback && ((error: ClientConfig.Error) => callback(error));
      const defaultErrorHandler = (error: Error) => { throw error; };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.clientConfig.middlewares?.onError?.(e);

      return errorHandler(e);
    }
  }
}
