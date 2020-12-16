import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class UserSearch {
  constructor(private client: Client) { }
  async findBulkAssignableUsers<T = any>(parameters: Parameters.FindBulkAssignableUsers, callback: Callback<T>): Promise<void>;
  async findBulkAssignableUsers<T = any>(parameters: Parameters.FindBulkAssignableUsers, callback?: undefined): Promise<T>;
  async findBulkAssignableUsers<T = any>(parameters: Parameters.FindBulkAssignableUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/assignable/multiProjectSearch',
      method: 'GET',
      params: {
        query: parameters.query,
        username: parameters.username,
        accountId: parameters.accountId,
        projectKeys: parameters.projectKeys,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findAssignableUsers<T = any>(parameters?: Parameters.FindAssignableUsers, callback?: Callback<T>): Promise<void>;
  async findAssignableUsers<T = any>(parameters?: Parameters.FindAssignableUsers, callback?: undefined): Promise<T>;
  async findAssignableUsers<T = any>(parameters?: Parameters.FindAssignableUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/assignable/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        sessionId: parameters?.sessionId,
        username: parameters?.username,
        accountId: parameters?.accountId,
        project: parameters?.project,
        issueKey: parameters?.issueKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        actionDescriptorId: parameters?.actionDescriptorId,
        recommend: parameters?.recommend,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUsersWithAllPermissions<T = any>(parameters: Parameters.FindUsersWithAllPermissions, callback: Callback<T>): Promise<void>;
  async findUsersWithAllPermissions<T = any>(parameters: Parameters.FindUsersWithAllPermissions, callback?: undefined): Promise<T>;
  async findUsersWithAllPermissions<T = any>(parameters: Parameters.FindUsersWithAllPermissions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/permission/search',
      method: 'GET',
      params: {
        query: parameters.query,
        username: parameters.username,
        accountId: parameters.accountId,
        permissions: parameters.permissions,
        issueKey: parameters.issueKey,
        projectKey: parameters.projectKey,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUsersForPicker<T = Models.FoundUsers>(parameters: Parameters.FindUsersForPicker, callback: Callback<T>): Promise<void>;
  async findUsersForPicker<T = Models.FoundUsers>(parameters: Parameters.FindUsersForPicker, callback?: undefined): Promise<T>;
  async findUsersForPicker<T = Models.FoundUsers>(parameters: Parameters.FindUsersForPicker, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/picker',
      method: 'GET',
      params: {
        query: parameters.query,
        maxResults: parameters.maxResults,
        showAvatar: parameters.showAvatar,
        exclude: parameters.exclude,
        excludeAccountIds: parameters.excludeAccountIds,
        avatarSize: parameters.avatarSize,
        excludeConnectUsers: parameters.excludeConnectUsers,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUsers<T = any>(parameters?: Parameters.FindUsers, callback?: Callback<T>): Promise<void>;
  async findUsers<T = any>(parameters?: Parameters.FindUsers, callback?: undefined): Promise<T>;
  async findUsers<T = any>(parameters?: Parameters.FindUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        username: parameters?.username,
        accountId: parameters?.accountId,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        property: parameters?.property,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUsersByQuery<T = Models.PageBeanUser>(parameters: Parameters.FindUsersByQuery, callback: Callback<T>): Promise<void>;
  async findUsersByQuery<T = Models.PageBeanUser>(parameters: Parameters.FindUsersByQuery, callback?: undefined): Promise<T>;
  async findUsersByQuery<T = Models.PageBeanUser>(parameters: Parameters.FindUsersByQuery, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/search/query',
      method: 'GET',
      params: {
        query: parameters.query,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: Parameters.FindUserKeysByQuery, callback: Callback<T>): Promise<void>;
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: Parameters.FindUserKeysByQuery, callback?: undefined): Promise<T>;
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: Parameters.FindUserKeysByQuery, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/search/query/key',
      method: 'GET',
      params: {
        query: parameters.query,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async findUsersWithBrowsePermission<T = any>(parameters?: Parameters.FindUsersWithBrowsePermission, callback?: Callback<T>): Promise<void>;
  async findUsersWithBrowsePermission<T = any>(parameters?: Parameters.FindUsersWithBrowsePermission, callback?: undefined): Promise<T>;
  async findUsersWithBrowsePermission<T = any>(parameters?: Parameters.FindUsersWithBrowsePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/viewissue/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        username: parameters?.username,
        accountId: parameters?.accountId,
        issueKey: parameters?.issueKey,
        projectKey: parameters?.projectKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
