import { AxiosRequestConfig } from 'axios';
import { Callback } from './callback';

export type Sender = {
  [key: string]: any;
  sendRequest: (request: AxiosRequestConfig, callback?: Callback) => Promise<any>;
};
