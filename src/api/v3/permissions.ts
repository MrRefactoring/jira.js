import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { Permissions as PermissionsResponse, BulkPermissionGrants as BulkPermissionGrantsResponse, PermittedProjects as PermittedProjectsResponse } from '../../models/v3';

export class Permissions {
  constructor(private readonly client: Client) { }

  async getMyPermissions(parameters?: {
    projectKey?: string;
    projectId?: string;
    issueKey?: string;
    issueId?: string;
    permissions?: string;
    projectUuid?: string;
    projectConfigurationUuid?: string;
  }, callback?: Callback<PermissionsResponse>): Promise<PermissionsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/mypermissions',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllPermissions(parameters?: any, callback?: Callback<PermissionsResponse>): Promise<PermissionsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/permissions',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBulkPermissions(parameters?: any, callback?: Callback<BulkPermissionGrantsResponse>): Promise<BulkPermissionGrantsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/permissions/check',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getPermittedProjects(parameters?: any, callback?: Callback<PermittedProjectsResponse>): Promise<PermittedProjectsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/permissions/project',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
