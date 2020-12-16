import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueLinkTypes {
  constructor(private client: Client) { }
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: Callback<T>): Promise<void>;
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: undefined): Promise<T>;
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueLinkType<T = any>(callback?: Callback<T>): Promise<void>;
  async createIssueLinkType<T = any>(callback?: undefined): Promise<T>;
  async createIssueLinkType<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback: Callback<T>): Promise<void>;
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback?: undefined): Promise<T>;
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback: Callback<T>): Promise<void>;
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback?: undefined): Promise<T>;
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueLinkType<T = any>(parameters: Parameters.DeleteIssueLinkType, callback: Callback<T>): Promise<void>;
  async deleteIssueLinkType<T = any>(parameters: Parameters.DeleteIssueLinkType, callback?: undefined): Promise<T>;
  async deleteIssueLinkType<T = any>(parameters: Parameters.DeleteIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
