import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  PermissionSchemes as PermissionSchemesResponse, PermissionScheme as PermissionSchemeResponse, PermissionGrants as PermissionGrantsResponse, PermissionGrant as PermissionGrantResponse,
} from '../../models/v3';

export class PermissionSchemes {
  constructor(private readonly client: Client) { }

  async getAllPermissionSchemes(parameters?: {
    expand?: string;
  }, callback?: Callback<PermissionSchemesResponse>): Promise<PermissionSchemesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/permissionscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createPermissionScheme(parameters?: {
    expand?: string;
  }, callback?: Callback<PermissionSchemeResponse>): Promise<PermissionSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/permissionscheme',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getPermissionScheme(parameters: {
    schemeId: number;
    expand?: string;
  }, callback?: Callback<PermissionSchemeResponse>): Promise<PermissionSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updatePermissionScheme(parameters: {
    schemeId: number;
    expand?: string;
  }, callback?: Callback<PermissionSchemeResponse>): Promise<PermissionSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deletePermissionScheme(parameters: {
    schemeId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getPermissionSchemeGrants(parameters: {
    schemeId: number;
    expand?: string;
  }, callback?: Callback<PermissionGrantsResponse>): Promise<PermissionGrantsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createPermissionGrant(parameters: {
    schemeId: number;
    expand?: string;
  }, callback?: Callback<PermissionGrantResponse>): Promise<PermissionGrantResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getPermissionSchemeGrant(parameters: {
    schemeId: number;
    permissionId: number;
    expand?: string;
  }, callback?: Callback<PermissionGrantResponse>): Promise<PermissionGrantResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deletePermissionSchemeEntity(parameters: {
    schemeId: number;
    permissionId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
