import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { ScreenableField } from '../models';

export class ScreenTabFields {
  constructor(private readonly client: Sender) {}

  public async getAllScreenTabFields(
    params: {
      screenId: number;
      tabId: number;
      projectKey?: string;
    },
    callback?: Callback<ScreenableField>,
  ): Promise<ScreenableField> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields`,
      method: 'GET',
      params: {
        projectKey: params?.projectKey,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async addScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      fieldId: string;
    },
    callback?: Callback<ScreenableField>,
  ): Promise<ScreenableField> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields`,
      method: 'POST',
      data: {
        fieldId: params?.fieldId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async removeScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      id: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async moveScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      id: string;
      after?: string;
      position?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields/${params.id}/move`,
      method: 'POST',
      data: {
        after: params?.after,
        position: params?.position,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
