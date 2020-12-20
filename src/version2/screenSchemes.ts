import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenSchemes {
  constructor(private client: Client) { }
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void>;
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: undefined): Promise<T>;
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: Callback<T>): Promise<void>;
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: undefined): Promise<T>;
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screenscheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        screens: parameters?.screens,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback: Callback<T>): Promise<void>;
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback?: undefined): Promise<T>;
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        screens: parameters.screens,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback: Callback<T>): Promise<void>;
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback?: undefined): Promise<T>;
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
