import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { SecurityScheme as SecuritySchemeResponse, PermissionScheme as PermissionSchemeResponse, ProjectIssueSecurityLevels as ProjectIssueSecurityLevelsResponse } from '../../models/v3';

export class ProjectPermissionSchemes {
  constructor(private readonly client: Client) { }

  async getProjectIssueSecurityScheme(parameters: {
    projectKeyOrId: string;
  }, callback?: Callback<SecuritySchemeResponse>): Promise<SecuritySchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAssignedPermissionScheme(parameters: {
    projectKeyOrId: string;
    expand?: string;
  }, callback?: Callback<PermissionSchemeResponse>): Promise<PermissionSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async assignPermissionScheme(parameters: {
    projectKeyOrId: string;
    expand?: string;
  }, callback?: Callback<PermissionSchemeResponse>): Promise<PermissionSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSecurityLevelsForProject(parameters: {
    projectKeyOrId: string;
  }, callback?: Callback<ProjectIssueSecurityLevelsResponse>): Promise<ProjectIssueSecurityLevelsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/securitylevel`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
