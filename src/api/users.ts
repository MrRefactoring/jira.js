import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  User,
  PageBeanUser,
  UnrestrictedUserEmail,
  UnrestrictedUserEmail,
} from '../schemas';
export class Users {
  constructor(private readonly client: Sender) {}

  public async getUser(
    params?: {
      accountId?: string;
      username?: string;
      key?: string;
      expand?: string;
    },
    callback?: Callback<User>,
  ): Promise<User> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user',
      method: 'GET',
      params: {
        accountId: params.accountId,
        username: params.username,
        key: params.key,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createUser(
    params: {
      self?: string;
      key?: string;
      name?: string;
      password?: string;
      emailAddress: string;
      displayName: string;
      notification?: string;
      applicationKeys?: Array<string>;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user',
      method: 'POST',
      data: { ...params },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteUser(
    params: {
      accountId: string;
      username?: string;
      key?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user',
      method: 'DELETE',
      params: {
        accountId: params.accountId,
        username: params.username,
        key: params.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async bulkGetUsers(
    params: {
      startAt?: number;
      maxResults?: number;
      username?: Array<string>;
      key?: Array<string>;
      accountId: Array<string>;
    },
    callback?: Callback<PageBeanUser>,
  ): Promise<PageBeanUser> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/bulk',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        username: params.username && params.username.join(','),
        key: params.key && params.key.join(','),
        accountId: params.accountId && params.accountId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAccountIdsForUsers(
    params?: {
      startAt?: number;
      maxResults?: number;
      username?: Array<string>;
      key?: Array<string>;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/bulk/migration',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        username: params.username && params.username.join(','),
        key: params.key && params.key.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getUserDefaultColumns(
    params?: {
      accountId?: string;
      username?: string;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/columns',
      method: 'GET',
      params: {
        accountId: params.accountId,
        username: params.username,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async setUserDefaultColumns(
    params?: {
      accountId?: string;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/columns',
      method: 'PUT',
      params: {
        accountId: params.accountId,
      },
      data: { ...params, accountId: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async resetUserDefaultColumns(
    params?: {
      accountId?: string;
      username?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/columns',
      method: 'DELETE',
      params: {
        accountId: params.accountId,
        username: params.username,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getUserEmail(
    params: {
      accountId: string;
    },
    callback?: Callback<UnrestrictedUserEmail>,
  ): Promise<UnrestrictedUserEmail> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/email',
      method: 'GET',
      params: {
        accountId: params.accountId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getUserEmailBulk(
    params: {
      accountId: Array<string>;
    },
    callback?: Callback<UnrestrictedUserEmail>,
  ): Promise<UnrestrictedUserEmail> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/email/bulk',
      method: 'GET',
      params: {
        accountId: params.accountId && params.accountId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getUserGroups(
    params: {
      accountId: string;
      username?: string;
      key?: string;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/groups',
      method: 'GET',
      params: {
        accountId: params.accountId,
        username: params.username,
        key: params.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllUsersDefault(
    params?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/users',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllUsers(
    params?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/users/search',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
