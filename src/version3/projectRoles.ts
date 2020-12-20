import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectRoles {
  constructor(private client: Client) { }
  async getProjectRoles<T = any>(parameters: Parameters.GetProjectRoles, callback: Callback<T>): Promise<void>;
  async getProjectRoles<T = any>(parameters: Parameters.GetProjectRoles, callback?: undefined): Promise<T>;
  async getProjectRoles<T = any>(parameters: Parameters.GetProjectRoles, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/role`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRole, callback: Callback<T>): Promise<void>;
  async getProjectRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRole, callback?: undefined): Promise<T>;
  async getProjectRole<T = Models.ProjectRole>(parameters: Parameters.GetProjectRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectRoleDetails<T = any>(parameters: Parameters.GetProjectRoleDetails, callback: Callback<T>): Promise<void>;
  async getProjectRoleDetails<T = any>(parameters: Parameters.GetProjectRoleDetails, callback?: undefined): Promise<T>;
  async getProjectRoleDetails<T = any>(parameters: Parameters.GetProjectRoleDetails, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/roledetails`,
      method: 'GET',
      params: {
        currentMember: parameters.currentMember,
        excludeConnectAddons: parameters.excludeConnectAddons,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllProjectRoles<T = any>(callback?: Callback<T>): Promise<void>;
  async getAllProjectRoles<T = any>(callback?: undefined): Promise<T>;
  async getAllProjectRoles<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/role',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createProjectRole<T = Models.ProjectRole>(parameters?: Parameters.CreateProjectRole, callback?: Callback<T>): Promise<void>;
  async createProjectRole<T = Models.ProjectRole>(parameters?: Parameters.CreateProjectRole, callback?: undefined): Promise<T>;
  async createProjectRole<T = Models.ProjectRole>(parameters?: Parameters.CreateProjectRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/role',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectRoleById<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleById, callback: Callback<T>): Promise<void>;
  async getProjectRoleById<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleById, callback?: undefined): Promise<T>;
  async getProjectRoleById<T = Models.ProjectRole>(parameters: Parameters.GetProjectRoleById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/role/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.PartialUpdateProjectRole, callback: Callback<T>): Promise<void>;
  async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.PartialUpdateProjectRole, callback?: undefined): Promise<T>;
  async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.PartialUpdateProjectRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/role/${parameters.id}`,
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.FullyUpdateProjectRole, callback: Callback<T>): Promise<void>;
  async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.FullyUpdateProjectRole, callback?: undefined): Promise<T>;
  async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: Parameters.FullyUpdateProjectRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/role/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProjectRole<T = void>(parameters: Parameters.DeleteProjectRole, callback: Callback<T>): Promise<void>;
  async deleteProjectRole<T = void>(parameters: Parameters.DeleteProjectRole, callback?: undefined): Promise<T>;
  async deleteProjectRole<T = void>(parameters: Parameters.DeleteProjectRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/role/${parameters.id}`,
      method: 'DELETE',
      params: {
        swap: parameters.swap,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
