import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { IssueLinkTypes as IssueLinkTypesResponse, IssueLinkType as IssueLinkTypeResponse } from '../../models/v2';

export class IssueLinkTypes {
  constructor(private readonly client: Client) { }

  async getIssueLinkTypes(parameters?: any, callback?: Callback<IssueLinkTypesResponse>): Promise<IssueLinkTypesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createIssueLinkType(parameters?: any, callback?: Callback<IssueLinkTypeResponse>): Promise<IssueLinkTypeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueLinkType(parameters: {
    issueLinkTypeId: string;
  }, callback?: Callback<IssueLinkTypeResponse>): Promise<IssueLinkTypeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateIssueLinkType(parameters: {
    issueLinkTypeId: string;
  }, callback?: Callback<IssueLinkTypeResponse>): Promise<IssueLinkTypeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueLinkType(parameters: {
    issueLinkTypeId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
