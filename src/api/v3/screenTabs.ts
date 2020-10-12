import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ScreenableTab as ScreenableTabResponse } from '../../models/v3';

export class ScreenTabs {
  constructor(private readonly client: Client) { }

  async getAllScreenTabs(parameters: {
    screenId: number;
    projectKey?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addScreenTab(parameters: {
    screenId: number;
  }, callback?: Callback<ScreenableTabResponse>): Promise<ScreenableTabResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async renameScreenTab(parameters: {
    screenId: number;
    tabId: number;
  }, callback?: Callback<ScreenableTabResponse>): Promise<ScreenableTabResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteScreenTab(parameters: {
    screenId: number;
    tabId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveScreenTab(parameters: {
    screenId: number;
    tabId: number;
    pos: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
