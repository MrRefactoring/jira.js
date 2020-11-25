import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T> | undefined): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>): Promise<void>;
}
