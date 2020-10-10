import { Callback } from './callback';
import { ClientConfig } from './clientConfig';

export interface Client {
  sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback?: undefined): Promise<T>;
  sendRequest<T>(requestConfig: ClientConfig.RequestConfig, callback: Callback<T>): Promise<void>;
}
