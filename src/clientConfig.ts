import { AxiosError } from 'axios';
import { UtilityTypes } from './utilityTypes';
import { RequestConfig } from './requestConfig';
// import { TelemetryConfig } from 'telemetry.jira.js';

export interface ClientConfig {
  host: string;
  strictGDPR?: boolean;
  baseRequestConfig?: ClientConfig.BaseRequestConfig;
  authentication?: ClientConfig.Authentication;
  middlewares?: ClientConfig.Middlewares;
  // telemetry?: TelemetryConfig;
}

export namespace ClientConfig {
  export type BaseRequestConfig = RequestConfig;

  export type Error = AxiosError;

  export type Authentication = UtilityTypes.XOR<{
    jwt: Authentication.JWT;
  }, UtilityTypes.XOR<{
    oauth: Authentication.OAuth;
  }, UtilityTypes.XOR<{
    basic: Authentication.Basic;
  }, {
    oauth2: Authentication.OAuth2;
  }>>>;

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
      /** The key from the app descriptor. */
      issuer: string;
      /** The sharedsecret key received during the app installation handshake */
      secret: string;
      /** Token expiry time (default 3 minutes after issuing) */
      expiryTimeSeconds?: number;
    };

    export type Basic = { username: string } & UtilityTypes.XOR<{ apiToken: string }, { password: string }>;

    export interface OAuth {
      consumerKey: string;
      consumerSecret: string;
      accessToken: string;
      tokenSecret: string;
    }

    export type OAuth2 = {
      accessToken: string;
    };
  }
}
