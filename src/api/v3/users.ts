import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { User as UserResponse, PageBeanUser as PageBeanUserResponse, UnrestrictedUserEmail as UnrestrictedUserEmailResponse } from '../../models/v3';

export class Users {
  constructor(private readonly client: Client) { }

  async getUser(parameters?: {
    accountId?: string;
    username?: string;
    key?: string;
    expand?: string;
  }, callback?: Callback<UserResponse>): Promise<UserResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createUser(parameters?: any, callback?: Callback<UserResponse>): Promise<UserResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeUser(parameters: {
    accountId: string;
    username?: string;
    key?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async bulkGetUsers(parameters: {
    startAt?: number;
    maxResults?: number;
    username?: string[];
    key?: string[];
    accountId: string[];
  }, callback?: Callback<PageBeanUserResponse>): Promise<PageBeanUserResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/bulk',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async bulkGetUsersMigration(parameters?: {
    startAt?: number;
    maxResults?: number;
    username?: string[];
    key?: string[];
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/bulk/migration',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUserDefaultColumns(parameters?: {
    accountId?: string;
    username?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setUserColumns(parameters?: {
    accountId?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async resetUserColumns(parameters?: {
    accountId?: string;
    username?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/columns',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUserEmail(parameters: {
    accountId: string;
  }, callback?: Callback<UnrestrictedUserEmailResponse>): Promise<UnrestrictedUserEmailResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/email',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUserEmailBulk(parameters: {
    accountId: string[];
  }, callback?: Callback<UnrestrictedUserEmailResponse>): Promise<UnrestrictedUserEmailResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/email/bulk',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUserGroups(parameters: {
    accountId: string;
    username?: string;
    key?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/user/groups',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllUsersDefault(parameters?: {
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/users',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllUsers(parameters?: {
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/users/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
