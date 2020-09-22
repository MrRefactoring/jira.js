import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class ProjectPermissionSchemes {
  constructor(private readonly client: Sender) {}

  public async getProjectIssueSecurityScheme(
    params: {
      projectKeyOrId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectKeyOrId}/issuesecuritylevelscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAssignedPermissionScheme(
    params: {
      projectKeyOrId: string;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectKeyOrId}/permissionscheme`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignPermissionScheme(
    params: {
      projectKeyOrId: string;
      expand?: string;
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectKeyOrId}/permissionscheme`,
      method: 'PUT',
      params: {
        expand: params.expand,
      },
      data: {
        id: params.id,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjectIssueSecurityLevels(
    params: {
      projectKeyOrId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectKeyOrId}/securitylevel`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
