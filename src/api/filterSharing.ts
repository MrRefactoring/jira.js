import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class FilterSharing {
  constructor(private readonly client: Sender) {}

  public async getDefaultShareScope(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async setDefaultShareScope(
    params: {
      scope: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'PUT',
      data: {
        scope: params.scope
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getSharePermissions(
    params: {
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/permission`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async addSharePermission(
    params: {
      id: number;
      type: string;
      projectId?: string;
      groupname?: string;
      projectRoleId?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/permission`,
      method: 'POST',
      data: {
        type: params.type,
        projectId: params.projectId,
        groupname: params.groupname,
        projectRoleId: params.projectRoleId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getSharePermission(
    params: {
      id: number;
      permissionId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/permission/${params.permissionId}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteSharePermission(
    params: {
      id: number;
      permissionId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/permission/${params.permissionId}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }
}
