import { AxiosError, AxiosRequestConfig } from 'axios';
import { UtilityTypes } from './utilityTypes';

export interface ClientConfig {
  host: string;
  strictGDPR?: boolean;
  baseRequestConfig?: ClientConfig.BaseRequestConfig;
  authentication?: ClientConfig.Authentication;
  middlewares?: ClientConfig.Middlewares;
}

export namespace ClientConfig {
  export type RequestConfig = AxiosRequestConfig;
  export type BaseRequestConfig = RequestConfig;

  export type Error = AxiosError;

  export type Authentication = UtilityTypes.XOR<{
    jwt: Authentication.JWT
  }, UtilityTypes.XOR<{
    accessToken: Authentication.AccessToken
  }, {
    basic: Authentication.Basic
  }>>;

  export interface Middlewares {
    onError?: ClientConfig.Middlewares.OnErrorHandler;
    onResponse?: ClientConfig.Middlewares.OnResponseHandler;
  }

  export namespace Middlewares {
    export type OnErrorHandler = (error: ClientConfig.Error) => void;
    export type OnResponseHandler = (data: any) => void;
  }

  export namespace Authentication {
    export type JWT = {
      iss: string;
      secret: string;
      expiryTimeSeconds?: number;
    };

    export type Basic = { username: string } & UtilityTypes.XOR<{ apiToken: string }, { password: string }>;

    export type AccessToken = string;
  }
}
