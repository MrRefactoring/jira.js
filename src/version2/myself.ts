import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Myself {
  constructor(private client: Client) { }
  async getPreference<T = any>(parameters: Parameters.GetPreference, callback: Callback<T>): Promise<void>;
  async getPreference<T = any>(parameters: Parameters.GetPreference, callback?: undefined): Promise<T>;
  async getPreference<T = any>(parameters: Parameters.GetPreference, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences',
      method: 'GET',
      params: {
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback: Callback<T>): Promise<void>;
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback?: undefined): Promise<T>;
  async setPreference<T = void>(parameters: Parameters.SetPreference, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences',
      method: 'PUT',
      params: {
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback: Callback<T>): Promise<void>;
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback?: undefined): Promise<T>;
  async removePreference<T = void>(parameters: Parameters.RemovePreference, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences',
      method: 'DELETE',
      params: {
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getLocale<T = Models.Locale>(callback?: Callback<T>): Promise<void>;
  async getLocale<T = Models.Locale>(callback?: undefined): Promise<T>;
  async getLocale<T = Models.Locale>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences/locale',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setLocale<T = void>(parameters?: Parameters.SetLocale, callback?: Callback<T>): Promise<void>;
  async setLocale<T = void>(parameters?: Parameters.SetLocale, callback?: undefined): Promise<T>;
  async setLocale<T = void>(parameters?: Parameters.SetLocale, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences/locale',
      method: 'PUT',
      data: {
        locale: parameters?.locale,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteLocale<T = void>(callback?: Callback<T>): Promise<void>;
  async deleteLocale<T = void>(callback?: undefined): Promise<T>;
  async deleteLocale<T = void>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/mypreferences/locale',
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: undefined): Promise<T>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/myself',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
