import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Screens {
  constructor(private client: Client) { }
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback: Callback<T>): Promise<void>;
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback?: undefined): Promise<T>;
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/screens`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: Callback<T>): Promise<void>;
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: undefined): Promise<T>;
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screens',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createScreen<T = any>(callback?: Callback<T>): Promise<void>;
  async createScreen<T = any>(callback?: undefined): Promise<T>;
  async createScreen<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screens',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback: Callback<T>): Promise<void>;
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback?: undefined): Promise<T>;
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback: Callback<T>): Promise<void>;
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: undefined): Promise<T>;
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteScreen<T = any>(parameters: Parameters.DeleteScreen, callback: Callback<T>): Promise<void>;
  async deleteScreen<T = any>(parameters: Parameters.DeleteScreen, callback?: undefined): Promise<T>;
  async deleteScreen<T = any>(parameters: Parameters.DeleteScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback: Callback<T>): Promise<void>;
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback?: undefined): Promise<T>;
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
