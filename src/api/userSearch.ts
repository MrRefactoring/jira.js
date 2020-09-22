import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class UserSearch {
  constructor(private readonly client: Sender) {}

  public async findUsersAssignableToProjects(
    params: {
      query?: string;
      username?: string;
      accountId?: string;
      projectKeys: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/assignable/multiProjectSearch',
      method: 'GET',
      params: {
        query: params.query,
        username: params.username,
        accountId: params.accountId,
        projectKeys: params.projectKeys,
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsersAssignableToIssues(
    params?: {
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
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/assignable/search',
      method: 'GET',
      params: {
        query: params.query,
        sessionId: params.sessionId,
        username: params.username,
        accountId: params.accountId,
        project: params.project,
        issueKey: params.issueKey,
        startAt: params.startAt,
        maxResults: params.maxResults,
        actionDescriptorId: params.actionDescriptorId,
        recommend: params.recommend,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsersWithPermissions(
    params: {
      query?: string;
      username?: string;
      accountId?: string;
      permissions: string;
      issueKey?: string;
      projectKey?: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/permission/search',
      method: 'GET',
      params: {
        query: params.query,
        username: params.username,
        accountId: params.accountId,
        permissions: params.permissions,
        issueKey: params.issueKey,
        projectKey: params.projectKey,
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsersForPicker(
    params: {
      query: string;
      maxResults?: number;
      showAvatar?: boolean;
      exclude?: Array<string>;
      excludeAccountIds?: Array<string>;
      avatarSize?: string;
      excludeConnectUsers?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/picker',
      method: 'GET',
      params: {
        query: params.query,
        maxResults: params.maxResults,
        showAvatar: params.showAvatar,
        exclude: params.exclude && params.exclude.join(','),
        excludeAccountIds:
          params.excludeAccountIds && params.excludeAccountIds.join(','),
        avatarSize: params.avatarSize,
        excludeConnectUsers: params.excludeConnectUsers,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsers(
    params?: {
      query?: string;
      username?: string;
      accountId?: string;
      startAt?: number;
      maxResults?: number;
      property?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/search',
      method: 'GET',
      params: {
        query: params.query,
        username: params.username,
        accountId: params.accountId,
        startAt: params.startAt,
        maxResults: params.maxResults,
        property: params.property,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsersByQuery(
    params: {
      query: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/search/query',
      method: 'GET',
      params: {
        query: params.query,
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUserKeysByQuery(
    params: {
      query: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/search/query/key',
      method: 'GET',
      params: {
        query: params.query,
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async findUsersWithBrowsePermission(
    params?: {
      query?: string;
      username?: string;
      accountId?: string;
      issueKey?: string;
      projectKey?: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/viewissue/search',
      method: 'GET',
      params: {
        query: params.query,
        username: params.username,
        accountId: params.accountId,
        issueKey: params.issueKey,
        projectKey: params.projectKey,
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
