import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { ScreenableTab } from '../models';

export class ScreenTabs {
  constructor(private readonly client: Sender) {}

  public async getAllScreenTabs(
    params: {
      screenId: number;
      projectKey?: string;
    },
    callback?: Callback<ScreenTabs[]>,
  ): Promise<ScreenTabs[]> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs`,
      method: 'GET',
      params: {
        projectKey: params?.projectKey,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createScreenTab(
    params: {
      screenId: number;
      id?: number;
      name: string;
    },
    callback?: Callback<ScreenableTab>,
  ): Promise<ScreenableTab> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs`,
      method: 'POST',
      data: {
        id: params?.id,
        name: params?.name,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateScreenTab(
    params: {
      screenId: number;
      tabId: number;
      id?: number;
      name: string;
    },
    callback?: Callback<ScreenableTab>,
  ): Promise<ScreenableTab> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}`,
      method: 'PUT',
      data: {
        id: params?.id,
        name: params?.name,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteScreenTab(
    params: {
      screenId: number;
      tabId: number;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async moveScreenTab(
    params: {
      screenId: number;
      tabId: number;
      pos: number;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/move/${params.pos}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
