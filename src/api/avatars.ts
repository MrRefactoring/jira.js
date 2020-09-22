import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class Avatars {
  constructor(private readonly client: Sender) {}

  public async getSystemAvatarsByType(
    params: {
      type: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/avatar/${params.type}/system`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAvatars(
    params: {
      type: string;
      entityId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${params.type}/owner/${params.entityId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async loadAvatar(
    params: {
      type: string;
      entityId: string;
      x?: number;
      y?: number;
      size: number;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${params.type}/owner/${params.entityId}`,
      method: 'POST',
      params: {
        x: params.x,
        y: params.y,
        size: params.size,
      },
      data: {
        ...params,
        type: undefined,
        entityId: undefined,
        x: undefined,
        y: undefined,
        size: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteAvatar(
    params: {
      type: string;
      owningObjectId: string;
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${params.type}/owner/${params.owningObjectId}/avatar/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
