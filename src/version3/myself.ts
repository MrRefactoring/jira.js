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
      url: '/rest/api/3/mypreferences',
      method: 'GET',
      params: {
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setPreference<T = any>(parameters: Parameters.SetPreference, callback: Callback<T>): Promise<void>;
  async setPreference<T = any>(parameters: Parameters.SetPreference, callback?: undefined): Promise<T>;
  async setPreference<T = any>(parameters: Parameters.SetPreference, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/mypreferences',
      method: 'PUT',
      params: {
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removePreference<T = any>(parameters: Parameters.RemovePreference, callback: Callback<T>): Promise<void>;
  async removePreference<T = any>(parameters: Parameters.RemovePreference, callback?: undefined): Promise<T>;
  async removePreference<T = any>(parameters: Parameters.RemovePreference, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/mypreferences',
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
      url: '/rest/api/3/mypreferences/locale',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setLocale<T = any>(parameters?: Parameters.SetLocale, callback?: Callback<T>): Promise<void>;
  async setLocale<T = any>(parameters?: Parameters.SetLocale, callback?: undefined): Promise<T>;
  async setLocale<T = any>(parameters?: Parameters.SetLocale, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/mypreferences/locale',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteLocale<T = any>(callback?: Callback<T>): Promise<void>;
  async deleteLocale<T = any>(callback?: undefined): Promise<T>;
  async deleteLocale<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/mypreferences/locale',
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: undefined): Promise<T>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/myself',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
