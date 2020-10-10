import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { Avatar as AvatarResponse, ProjectAvatars as ProjectAvatarsResponse } from '../../models/v3';

export class ProjectAvatars {
  constructor(private readonly client: Client) { }

  async updateProjectAvatar(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProjectAvatar(parameters: {
    projectIdOrKey: string;
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async createProjectAvatar(parameters: {
    projectIdOrKey: string;
    x?: number;
    y?: number;
    size?: number;
  }, callback?: Callback<AvatarResponse>): Promise<AvatarResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar2`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllProjectAvatars(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<ProjectAvatarsResponse>): Promise<ProjectAvatarsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatars`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
