import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { IssueLinkTypes as IssueLinkTypesResponse, IssueLinkType, IssueLinkType } from '../schemas';
export class IssueLinkTypes {
  constructor(private readonly client: Sender) {}

  public async getIssueLinkTypes(
    callback?: Callback<IssueLinkTypesResponse>,
  ): Promise<IssueLinkTypesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async createIssueLinkType(
    params?: {
      id?: string;
      name?: string;
      inward?: string;
      outward?: string;
      self?: string;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
      data: {
        id: params.id,
        name: params.name,
        inward: params.inward,
        outward: params.outward,
        self: params.self,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueLinkType(
    params: {
      issueLinkTypeId: string;
    },
    callback?: Callback<IssueLinkType>,
  ): Promise<IssueLinkType> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${params.issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateIssueLinkType(
    params: {
      issueLinkTypeId: string;
      id?: string;
      name?: string;
      inward?: string;
      outward?: string;
      self?: string;
    },
    callback?: Callback<IssueLinkType>,
  ): Promise<IssueLinkType> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${params.issueLinkTypeId}`,
      method: 'PUT',
      data: {
        id: params.id,
        name: params.name,
        inward: params.inward,
        outward: params.outward,
        self: params.self,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueLinkType(
    params: {
      issueLinkTypeId: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLinkType/${params.issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
