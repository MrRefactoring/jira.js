import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ScreenableField as ScreenableFieldResponse } from '../../models/v2';

export class ScreenTabFields {
  constructor(private readonly client: Client) { }

  async getAllScreenTabFields(parameters: {
    screenId: number;
    tabId: number;
    projectKey?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addScreenTabField(parameters: {
    screenId: number;
    tabId: number;
  }, callback?: Callback<ScreenableFieldResponse>): Promise<ScreenableFieldResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeScreenTabField(parameters: {
    screenId: number;
    tabId: number;
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveScreenTabField(parameters: {
    screenId: number;
    tabId: number;
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
