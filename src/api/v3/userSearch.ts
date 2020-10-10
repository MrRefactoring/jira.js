import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { FoundUsers as FoundUsersResponse, PageBeanUser as PageBeanUserResponse, PageBeanUserKey as PageBeanUserKeyResponse } from '../../models/v3';

export class UserSearch {
  constructor(private readonly client: Client) { }

  async findBulkAssignableUsers(parameters: {
    query?: string;
    username?: string;
    accountId?: string;
    projectKeys: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/assignable/multiProjectSearch',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findAssignableUsers(parameters?: {
    query?: string;
    sessionId?: string;
    username?: string;
    accountId?: string;
    project?: string;
    issueKey?: string;
    startAt?: number;
    maxResults?: number;
    actionDescriptorId?: number;
    recommend?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/assignable/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUsersWithAllPermissions(parameters: {
    query?: string;
    username?: string;
    accountId?: string;
    permissions: string;
    issueKey?: string;
    projectKey?: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/permission/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUsersForPicker(parameters: {
    query: string;
    maxResults?: number;
    showAvatar?: boolean;
    exclude?: string[];
    excludeAccountIds?: string[];
    avatarSize?: string;
    excludeConnectUsers?: boolean;
  }, callback?: Callback<FoundUsersResponse>): Promise<FoundUsersResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/picker',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUsers(parameters?: {
    query?: string;
    username?: string;
    accountId?: string;
    startAt?: number;
    maxResults?: number;
    property?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUsersByQuery(parameters: {
    query: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanUserResponse>): Promise<PageBeanUserResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/search/query',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUserKeysByQuery(parameters: {
    query: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanUserKeyResponse>): Promise<PageBeanUserKeyResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/search/query/key',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async findUsersWithBrowsePermission(parameters?: {
    query?: string;
    username?: string;
    accountId?: string;
    issueKey?: string;
    projectKey?: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/viewissue/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
