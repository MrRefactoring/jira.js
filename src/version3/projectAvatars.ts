import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectAvatars {
  constructor(private client: Client) { }
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback: Callback<T>): Promise<void>;
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback?: undefined): Promise<T>;
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar`,
      method: 'PUT',
      data: {
        id: parameters.id,
        owner: parameters.owner,
        isSystemAvatar: parameters.isSystemAvatar,
        isSelected: parameters.isSelected,
        isDeletable: parameters.isDeletable,
        fileName: parameters.fileName,
        urls: parameters.urls,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback: Callback<T>): Promise<void>;
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback?: undefined): Promise<T>;
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback: Callback<T>): Promise<void>;
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback?: undefined): Promise<T>;
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar2`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback: Callback<T>): Promise<void>;
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback?: undefined): Promise<T>;
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatars`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
