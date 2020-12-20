import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Groups {
  constructor(private client: Client) { }
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback: Callback<T>): Promise<void>;
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: undefined): Promise<T>;
  async getGroup<T = Models.Group>(parameters: Parameters.GetGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: Callback<T>): Promise<void>;
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: undefined): Promise<T>;
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group',
      method: 'POST',
      data: {
        name: parameters?.name,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeGroup<T = any>(parameters: Parameters.RemoveGroup, callback: Callback<T>): Promise<void>;
  async removeGroup<T = any>(parameters: Parameters.RemoveGroup, callback?: undefined): Promise<T>;
  async removeGroup<T = any>(parameters: Parameters.RemoveGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        swapGroup: parameters.swapGroup,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: Callback<T>): Promise<void>;
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: undefined): Promise<T>;
  async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters?: Parameters.BulkGetGroups, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group/bulk',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        groupId: parameters?.groupId,
        groupName: parameters?.groupName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback: Callback<T>): Promise<void>;
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback?: undefined): Promise<T>;
  async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: Parameters.GetUsersFromGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group/member',
      method: 'GET',
      params: {
        groupname: parameters.groupname,
        includeInactiveUsers: parameters.includeInactiveUsers,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback: Callback<T>): Promise<void>;
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback?: undefined): Promise<T>;
  async addUserToGroup<T = Models.Group>(parameters: Parameters.AddUserToGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group/user',
      method: 'POST',
      params: {
        groupname: parameters.groupname,
      },
      data: {
        name: parameters.name,
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeUserFromGroup<T = any>(parameters: Parameters.RemoveUserFromGroup, callback: Callback<T>): Promise<void>;
  async removeUserFromGroup<T = any>(parameters: Parameters.RemoveUserFromGroup, callback?: undefined): Promise<T>;
  async removeUserFromGroup<T = any>(parameters: Parameters.RemoveUserFromGroup, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/group/user',
      method: 'DELETE',
      params: {
        groupname: parameters.groupname,
        username: parameters.username,
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: Callback<T>): Promise<void>;
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: undefined): Promise<T>;
  async findGroups<T = Models.FoundGroups>(parameters?: Parameters.FindGroups, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/groups/picker',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        query: parameters?.query,
        exclude: parameters?.exclude,
        maxResults: parameters?.maxResults,
        userName: parameters?.userName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
