import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PropertyKeys as PropertyKeysResponse, EntityProperty as EntityPropertyResponse } from '../../models/v3';

export class IssueTypeProperties {
  constructor(private readonly client: Client) { }

  async getIssueTypePropertyKeys(parameters: {
    issueTypeId: string;
  }, callback?: Callback<PropertyKeysResponse>): Promise<PropertyKeysResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueTypeProperty(parameters: {
    issueTypeId: string;
    propertyKey: string;
  }, callback?: Callback<EntityPropertyResponse>): Promise<EntityPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setIssueTypeProperty(parameters: {
    issueTypeId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueTypeProperty(parameters: {
    issueTypeId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
