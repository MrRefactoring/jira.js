import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { Locale as LocaleResponse, User as UserResponse } from '../../models/v3';

export class Myself {
  constructor(private readonly client: Client) { }

  async getPreference(parameters: {
    key: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setPreference(parameters: {
    key: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async removePreference(parameters: {
    key: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getLocale(parameters?: any, callback?: Callback<LocaleResponse>): Promise<LocaleResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setLocale(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteLocale(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypreferences/locale',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getCurrentUser(parameters?: {
    expand?: string;
  }, callback?: Callback<UserResponse>): Promise<UserResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/myself',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
