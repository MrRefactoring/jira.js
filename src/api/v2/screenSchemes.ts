import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PageBeanScreenScheme as PageBeanScreenSchemeResponse, ScreenSchemeId as ScreenSchemeIdResponse } from '../../models/v2';

export class ScreenSchemes {
  constructor(private readonly client: Client) { }

  async getScreenSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
    id?: number[];
  }, callback?: Callback<PageBeanScreenSchemeResponse>): Promise<PageBeanScreenSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createScreenScheme(parameters?: any, callback?: Callback<ScreenSchemeIdResponse>): Promise<ScreenSchemeIdResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateScreenScheme(parameters: {
    screenSchemeId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteScreenScheme(parameters: {
    screenSchemeId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
