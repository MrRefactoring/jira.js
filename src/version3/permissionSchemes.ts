import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class PermissionSchemes {
  constructor(private client: Client) { }
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters?: Parameters.GetAllPermissionSchemes, callback?: Callback<T>): Promise<void>;
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters?: Parameters.GetAllPermissionSchemes, callback?: undefined): Promise<T>;
  async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters?: Parameters.GetAllPermissionSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/permissionscheme',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createPermissionScheme<T = any>(parameters?: Parameters.CreatePermissionScheme, callback?: Callback<T>): Promise<void>;
  async createPermissionScheme<T = any>(parameters?: Parameters.CreatePermissionScheme, callback?: undefined): Promise<T>;
  async createPermissionScheme<T = any>(parameters?: Parameters.CreatePermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/permissionscheme',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetPermissionScheme, callback: Callback<T>): Promise<void>;
  async getPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetPermissionScheme, callback?: undefined): Promise<T>;
  async getPermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.GetPermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updatePermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.UpdatePermissionScheme, callback: Callback<T>): Promise<void>;
  async updatePermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.UpdatePermissionScheme, callback?: undefined): Promise<T>;
  async updatePermissionScheme<T = Models.PermissionScheme>(parameters: Parameters.UpdatePermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deletePermissionScheme<T = any>(parameters: Parameters.DeletePermissionScheme, callback: Callback<T>): Promise<void>;
  async deletePermissionScheme<T = any>(parameters: Parameters.DeletePermissionScheme, callback?: undefined): Promise<T>;
  async deletePermissionScheme<T = any>(parameters: Parameters.DeletePermissionScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: Parameters.GetPermissionSchemeGrants, callback: Callback<T>): Promise<void>;
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: Parameters.GetPermissionSchemeGrants, callback?: undefined): Promise<T>;
  async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: Parameters.GetPermissionSchemeGrants, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createPermissionGrant<T = any>(parameters: Parameters.CreatePermissionGrant, callback: Callback<T>): Promise<void>;
  async createPermissionGrant<T = any>(parameters: Parameters.CreatePermissionGrant, callback?: undefined): Promise<T>;
  async createPermissionGrant<T = any>(parameters: Parameters.CreatePermissionGrant, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: Parameters.GetPermissionSchemeGrant, callback: Callback<T>): Promise<void>;
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: Parameters.GetPermissionSchemeGrant, callback?: undefined): Promise<T>;
  async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: Parameters.GetPermissionSchemeGrant, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deletePermissionSchemeEntity<T = any>(parameters: Parameters.DeletePermissionSchemeEntity, callback: Callback<T>): Promise<void>;
  async deletePermissionSchemeEntity<T = any>(parameters: Parameters.DeletePermissionSchemeEntity, callback?: undefined): Promise<T>;
  async deletePermissionSchemeEntity<T = any>(parameters: Parameters.DeletePermissionSchemeEntity, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
