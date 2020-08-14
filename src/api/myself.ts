import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class Myself {
  constructor(private readonly client: Sender) {}

  public async getPreference(
    params: {
      key: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences',
      method: 'GET',
      params: {
        key: params.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async setPreference(
    params: {
      key: string;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences',
      method: 'PUT',
      params: {
        key: params.key,
      },
      data: { ...params, key: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deletePreference(
    params: {
      key: string;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences',
      method: 'DELETE',
      params: {
        key: params.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getLocale(callback?: Callback): Promise<Schemas.Locale> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences/locale',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setLocale(
    params?: {
      locale?: string;
    },
    callback?: Callback,
  ): Promise<void> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences/locale',
      method: 'PUT',
      data: {
        locale: params.locale,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteLocale(callback?: Callback): Promise<void> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypreferences/locale',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getCurrentUser(
    params?: {
      expand?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.User> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/myself',
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
