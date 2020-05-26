import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class PermissionSchemes {
  constructor(private readonly client: Sender) { }

  public async getAllPermissionSchemes(
    params?: {
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/permissionscheme',
      method: 'GET',
      params: {
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createPermissionScheme(
    params: {
      expand?: string;
      id?: number;
      self?: string;
      name: string;
      description?: string;
      scope?: any;
      permissions?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/permissionscheme',
      method: 'POST',
      params: {
        expand: params.expand
      },
      data: { ...params, expand: undefined }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getPermissionScheme(
    params: {
      schemeId: number;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}`,
      method: 'GET',
      params: {
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async updatePermissionScheme(
    params: {
      schemeId: number;
      expand?: string;
      id?: number;
      self?: string;
      name: string;
      description?: string;
      scope?: any;
      permissions?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}`,
      method: 'PUT',
      params: {
        expand: params.expand
      },
      data: { ...params, schemeId: undefined, expand: undefined }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deletePermissionScheme(
    params: {
      schemeId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getPermissionSchemeGrants(
    params: {
      schemeId: number;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}/permission`,
      method: 'GET',
      params: {
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createPermissionGrant(
    params: {
      schemeId: number;
      expand?: string;
      id?: number;
      self?: string;
      holder?: any;
      permission?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}/permission`,
      method: 'POST',
      params: {
        expand: params.expand
      },
      data: {
        id: params.id,
        self: params.self,
        holder: params.holder,
        permission: params.permission
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getPermissionSchemeGrant(
    params: {
      schemeId: number;
      permissionId: number;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}/permission/${params.permissionId}`,
      method: 'GET',
      params: {
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deletePermissionSchemeGrant(
    params: {
      schemeId: number;
      permissionId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/permissionscheme/${params.schemeId}/permission/${params.permissionId}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }
}
