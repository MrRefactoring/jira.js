import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { SystemAvatars as SystemAvatarsResponse, Avatars as AvatarsResponse, Avatar as AvatarResponse } from '../../models/v2';

export class Avatars {
  constructor(private readonly client: Client) { }

  async getAllSystemAvatars(parameters: {
    type: string;
  }, callback?: Callback<SystemAvatarsResponse>): Promise<SystemAvatarsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/avatar/${parameters.type}/system`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAvatars(parameters: {
    type: string;
    entityId: string;
  }, callback?: Callback<AvatarsResponse>): Promise<AvatarsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async storeAvatar(parameters: {
    type: string;
    entityId: string;
    x?: number;
    y?: number;
    size: number;
  }, callback?: Callback<AvatarResponse>): Promise<AvatarResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteAvatar(parameters: {
    type: string;
    owningObjectId: string;
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
