import { AxiosRequestConfig } from 'axios';

export interface Config {
  host: string;
  /** @deprecated Use <b>baseRequestConfig</b> property for setting timeout value */
  timeout?: number;
  strictGDPR?: boolean;
  baseRequestConfig?: Config.BaseRequestConfig;
  authentication?: Config.Authentication;
}

export namespace Config {
  export type BaseRequestConfig = AxiosRequestConfig;

  export namespace Authentication {
    export type JWT = {
      iss: string;
      secret: string;
      expiryTimeSeconds?: number;
    };

    export type Basic = {
      username: string;
      apiToken: string;
    } | {
      username: string;
      password: string;
    };

    export type AccessToken = string;
  }

  export type Authentication = {
    jwt?: Authentication.JWT;
    accessToken?: Authentication.AccessToken;
    basic?: Authentication.Basic;
  };
}
