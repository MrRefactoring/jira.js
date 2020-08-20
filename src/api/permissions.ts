import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  Permissions as PermissionsResponse,
  BulkPermissionGrants,
  PermittedProjects,
} from '../schemas';
export class Permissions {
  constructor(private readonly client: Sender) {}

  public async getMyPermissions(
    params?: {
      projectKey?: string;
      projectId?: string;
      issueKey?: string;
      issueId?: string;
      permissions?: string;
      projectUuid?: string;
      projectConfigurationUuid?: string;
    },
    callback?: Callback<PermissionsResponse>,
  ): Promise<PermissionsResponse> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/mypermissions',
      method: 'GET',
      params: {
        projectKey: params.projectKey,
        projectId: params.projectId,
        issueKey: params.issueKey,
        issueId: params.issueId,
        permissions: params.permissions,
        projectUuid: params.projectUuid,
        projectConfigurationUuid: params.projectConfigurationUuid,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllPermissions(
    callback?: Callback<PermissionsResponse>,
  ): Promise<PermissionsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/permissions',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getBulkPermissions(
    params?: {
      projectPermissions?: Array<any>;
      globalPermissions?: Array<string>;
      accountId?: string;
    },
    callback?: Callback<BulkPermissionGrants>,
  ): Promise<BulkPermissionGrants> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/permissions/check',
      method: 'POST',
      data: {
        projectPermissions: params.projectPermissions,
        globalPermissions: params.globalPermissions,
        accountId: params.accountId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getPermittedProjects(
    params: {
      permissions: Array<string>;
    },
    callback?: Callback<PermittedProjects>,
  ): Promise<PermittedProjects> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/permissions/project',
      method: 'POST',
      data: {
        permissions: params.permissions,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
