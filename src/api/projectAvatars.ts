import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ProjectAvatars {
  constructor(private readonly client: Sender) { }

  public async setProjectAvatar(
    params: {
      projectIdOrKey: string;
      id: string;
      owner?: string;
      isSystemAvatar?: boolean;
      isSelected?: boolean;
      isDeletable?: boolean;
      fileName?: string;
      urls?: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/avatar`,
      method: 'PUT',
      data: {
        id: params.id,
        owner: params.owner,
        isSystemAvatar: params.isSystemAvatar,
        isSelected: params.isSelected,
        isDeletable: params.isDeletable,
        fileName: params.fileName,
        urls: params.urls,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteProjectAvatar(
    params: {
      projectIdOrKey: string;
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/avatar/${params.id}`,
      method: 'DELETE',
    };
    return this.client.sendRequest(request, callback);
  }

  public async loadProjectAvatar(
    params: {
      projectIdOrKey: string;
      x?: number;
      y?: number;
      size?: number;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/avatar2`,
      method: 'POST',
      params: {
        x: params.x,
        y: params.y,
        size: params.size,
      },
      data: {
        ...params,
        projectIdOrKey: undefined,
        x: undefined,
        y: undefined,
        size: undefined,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllProjectAvatars(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/avatars`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }
}
