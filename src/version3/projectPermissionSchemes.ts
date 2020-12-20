import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectPermissionSchemes {
  constructor(private client: Client) { }
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetProjectIssueSecurityScheme, callback: Callback<T>): Promise<void>;
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetProjectIssueSecurityScheme, callback?: undefined): Promise<T>;
  async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetProjectIssueSecurityScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetAssignedPermissionScheme, callback: Callback<T>): Promise<void>;
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetAssignedPermissionScheme, callback?: undefined): Promise<T>;
  async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetAssignedPermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.AssignPermissionScheme, callback: Callback<T>): Promise<void>;
  async assignPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.AssignPermissionScheme, callback?: undefined): Promise<T>;
  async assignPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.AssignPermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        id: parameters.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: Parameters.GetSecurityLevelsForProject, callback: Callback<T>): Promise<void>;
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: Parameters.GetSecurityLevelsForProject, callback?: undefined): Promise<T>;
  async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: Parameters.GetSecurityLevelsForProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/securitylevel`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
