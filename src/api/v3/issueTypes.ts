import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { IssueTypeDetails as IssueTypeDetailsResponse, Avatar as AvatarResponse } from '../../models/v3';

export class IssueTypes {
  constructor(private readonly client: Client) { }

  async getIssueAllTypes(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetype',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueType(parameters?: any, callback?: Callback<IssueTypeDetailsResponse>): Promise<IssueTypeDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuetype',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueType(parameters: {
    id: string;
  }, callback?: Callback<IssueTypeDetailsResponse>): Promise<IssueTypeDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateIssueType(parameters: {
    id: string;
  }, callback?: Callback<IssueTypeDetailsResponse>): Promise<IssueTypeDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueType(parameters: {
    id: string;
    alternativeIssueTypeId?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAlternativeIssueTypes(parameters: {
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.id}/alternatives`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueTypeAvatar(parameters: {
    id: string;
    x?: number;
    y?: number;
    size: number;
  }, callback?: Callback<AvatarResponse>): Promise<AvatarResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.id}/avatar2`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
