import type { AxiosResponse } from 'axios';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>): Promise<void>;

  sendRequestFullResponse<T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSuccessResponse<T>(response: any, callback?: Callback<T> | undefined | never): T | void;
  handleFailedResponse<T>(e: Error, callback?: Callback<T> | never): void;
}
