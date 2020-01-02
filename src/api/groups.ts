import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Groups {
  constructor(private readonly client: Sender) {}

  public async getGroup(
    params: {
      groupname: string;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'GET',
      params: {
        groupname: params.groupname,
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createGroup(
    params: {
      name: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'POST',
      data: { ...params }
    };
    return this.client.sendRequest(request, callback);
  }

  public async removeGroup(
    params: {
      groupname: string;
      swapGroup?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group',
      method: 'DELETE',
      params: {
        groupname: params.groupname,
        swapGroup: params.swapGroup
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getUsersFromGroup(
    params: {
      groupname: string;
      includeInactiveUsers?: boolean;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/member',
      method: 'GET',
      params: {
        groupname: params.groupname,
        includeInactiveUsers: params.includeInactiveUsers,
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async addUserToGroup(
    params: {
      groupname: string;
      name?: string;
      accountId?: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/user',
      method: 'POST',
      params: {
        groupname: params.groupname
      },
      data: { ...params, groupname: undefined }
    };
    return this.client.sendRequest(request, callback);
  }

  public async removeUserFromGroup(
    params: {
      groupname: string;
      username?: string;
      accountId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/group/user',
      method: 'DELETE',
      params: {
        groupname: params.groupname,
        username: params.username,
        accountId: params.accountId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async findGroups(
    params: {
      accountId?: string;
      query?: string;
      exclude?: Array<string>;
      maxResults?: number;
      userName?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/groups/picker',
      method: 'GET',
      params: {
        accountId: params.accountId,
        query: params.query,
        exclude: params.exclude && params.exclude.join(','),
        maxResults: params.maxResults,
        userName: params.userName
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
