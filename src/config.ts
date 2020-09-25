import { AxiosRequestConfig } from 'axios';

export interface Config {
  host: string;
  /** @deprecated Use <b>baseRequestConfig</b> property for setting timeout value */
  timeout?: number;
  strictGDPR?: boolean;
  baseRequestConfig?: Config.BaseRequestConfig;
  authentication?: Config.Authentication;
  middlewares?: Config.Middlewares;
}

export namespace Config {
  export type BaseRequestConfig = AxiosRequestConfig;

  export interface Authentication {
    jwt?: Authentication.JWT;
    accessToken?: Authentication.AccessToken;
    basic?: Authentication.Basic;
  }

  export interface Middlewares {
    onError?: Config.Middlewares.OnErrorHandler;
    onResponse?: Config.Middlewares.OnResponseHandler;
  }

  export namespace Middlewares {
    export type OnErrorHandler = (error: Error) => void;
    export type OnResponseHandler = (data: any) => void;
  }

  export namespace Authentication {
    export type JWT = {
      iss: string;
      secret: string;
      expiryTimeSeconds?: number;
    };

    export type Basic = {
      username: string;
      apiToken?: string;
      password?: string;
    };

    export type AccessToken = string;
  }
}
