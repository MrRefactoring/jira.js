import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  Group as GroupResponse, PageBeanGroupDetails as PageBeanGroupDetailsResponse, PageBeanUserDetails as PageBeanUserDetailsResponse, FoundGroups as FoundGroupsResponse,
} from '../../models/v2';

export class Groups {
  constructor(private readonly client: Client) { }

  async getGroup(parameters: {
    groupname: string;
    expand?: string;
  }, callback?: Callback<GroupResponse>): Promise<GroupResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createGroup(parameters?: any, callback?: Callback<GroupResponse>): Promise<GroupResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeGroup(parameters: {
    groupname: string;
    swapGroup?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async bulkGetGroups(parameters: {
    startAt?: number;
    maxResults?: number;
    groupId: string[];
  }, callback?: Callback<PageBeanGroupDetailsResponse>): Promise<PageBeanGroupDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/bulk',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUsersFromGroup(parameters: {
    groupname: string;
    includeInactiveUsers?: boolean;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanUserDetailsResponse>): Promise<PageBeanUserDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/member',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addUserToGroup(parameters: {
    groupname: string;
  }, callback?: Callback<GroupResponse>): Promise<GroupResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/user',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeUserFromGroup(parameters: {
    groupname: string;
    username?: string;
    accountId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/user',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async findGroups(parameters?: {
    accountId?: string;
    query?: string;
    exclude?: string[];
    maxResults?: number;
    userName?: string;
  }, callback?: Callback<FoundGroupsResponse>): Promise<FoundGroupsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/groups/picker',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
