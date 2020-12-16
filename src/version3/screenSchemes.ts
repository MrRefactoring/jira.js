import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenSchemes {
  constructor(private client: Client) { }
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void>;
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: undefined): Promise<T>;
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/screenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createScreenScheme<T = any>(callback?: Callback<T>): Promise<void>;
  async createScreenScheme<T = any>(callback?: undefined): Promise<T>;
  async createScreenScheme<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/screenscheme',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateScreenScheme<T = any>(parameters: Parameters.UpdateScreenScheme, callback: Callback<T>): Promise<void>;
  async updateScreenScheme<T = any>(parameters: Parameters.UpdateScreenScheme, callback?: undefined): Promise<T>;
  async updateScreenScheme<T = any>(parameters: Parameters.UpdateScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteScreenScheme<T = any>(parameters: Parameters.DeleteScreenScheme, callback: Callback<T>): Promise<void>;
  async deleteScreenScheme<T = any>(parameters: Parameters.DeleteScreenScheme, callback?: undefined): Promise<T>;
  async deleteScreenScheme<T = any>(parameters: Parameters.DeleteScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screenscheme/${parameters.screenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
