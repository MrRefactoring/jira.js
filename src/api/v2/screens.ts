import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PageBeanScreen as PageBeanScreenResponse, Screen as ScreenResponse } from '../../models/v2';

export class Screens {
  constructor(private readonly client: Client) { }

  async getScreensForField(parameters: {
    fieldId: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanScreenResponse>): Promise<PageBeanScreenResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/screens`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getScreens(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
  }, callback?: Callback<PageBeanScreenResponse>): Promise<PageBeanScreenResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screens',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createScreen(parameters?: any, callback?: Callback<ScreenResponse>): Promise<ScreenResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screens',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async addFieldToDefaultScreen(parameters: {
    fieldId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateScreen(parameters: {
    screenId: number;
  }, callback?: Callback<ScreenResponse>): Promise<ScreenResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteScreen(parameters: {
    screenId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAvailableScreenFields(parameters: {
    screenId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
