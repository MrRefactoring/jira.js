import { Config } from './config';
import { Callback } from './callback';

export type Sender = {
  [key: string]: any;
  sendRequest: (request: Config.BaseRequestConfig, callback?: Callback) => Promise<any>;
};
