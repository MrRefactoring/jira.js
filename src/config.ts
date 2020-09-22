import { AxiosRequestConfig } from 'axios';

export interface Config {
  host: string;
  /** @deprecated Use <b>baseRequestConfig</b> property for setting timeout value */
  timeout?: number;
  strictGDPR?: boolean;
  baseRequestConfig?: Config.BaseRequestConfig;
  authentication?: Config.Authentication;
  globalHandlers?: Config.GlobalHandlers;
}

export namespace Config {
  export type BaseRequestConfig = AxiosRequestConfig;

  export interface Authentication {
    jwt?: Authentication.JWT;
    accessToken?: Authentication.AccessToken;
    basic?: Authentication.Basic;
  }

  export interface GlobalHandlers {
    error?: Config.GlobalHandlers.ErrorHandler;
    response?: Config.GlobalHandlers.ResponseHandler;
  }

  export namespace GlobalHandlers {
    export type ErrorHandler = (error: Error) => void;
    export type ResponseHandler = (data: any) => void;
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
