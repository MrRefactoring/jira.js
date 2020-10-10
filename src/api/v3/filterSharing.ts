import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { DefaultShareScope as DefaultShareScopeResponse, SharePermission as SharePermissionResponse } from '../../models/v3';

export class FilterSharing {
  constructor(private readonly client: Client) { }

  async getDefaultShareScope(parameters?: any, callback?: Callback<DefaultShareScopeResponse>): Promise<DefaultShareScopeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter/defaultShareScope',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setDefaultShareScope(parameters?: any, callback?: Callback<DefaultShareScopeResponse>): Promise<DefaultShareScopeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter/defaultShareScope',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSharePermissions(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/permission`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addSharePermission(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/permission`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSharePermission(parameters: {
    id: number;
    permissionId: number;
  }, callback?: Callback<SharePermissionResponse>): Promise<SharePermissionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteSharePermission(parameters: {
    id: number;
    permissionId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
