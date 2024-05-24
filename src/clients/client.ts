import type { AxiosResponse } from 'axios';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never, telemetryData?: any): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>, telemetryData?: any): Promise<void>;

  sendRequestFullResponse<T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>>;
  handleSuccessResponse<T>(response: any, callback?: Callback<T> | undefined | never): T | void;
  handleFailedResponse<T>(e: Error, callback?: Callback<T> | never): void;
}
