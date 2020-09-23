import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  PageBeanScreenScheme,
  ScreenSchemeId,
} from '../models';

export class ScreenSchemes {
  constructor(private readonly client: Sender) {}

  public async getScreenSchemes(
    params?: {
      startAt?: number;
      maxResults?: number;
      id?: Array<number>;
    },
    callback?: Callback<PageBeanScreenScheme>,
  ): Promise<PageBeanScreenScheme> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      params: {
        startAt: params?.startAt,
        maxResults: params?.maxResults,
        id: params?.id?.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createScreenScheme(
    params: {
      name: string;
      description?: string;
      screens?: any;
    },
    callback?: Callback<ScreenSchemeId>,
  ): Promise<ScreenSchemeId> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'POST',
      data: {
        name: params?.name,
        description: params?.description,
        screens: params?.screens,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteScreenScheme(
    params: {
      screenSchemeId: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screenscheme/${params.screenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
