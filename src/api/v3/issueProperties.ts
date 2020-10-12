import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PropertyKeys as PropertyKeysResponse, EntityProperty as EntityPropertyResponse } from '../../models/v3';

export class IssueProperties {
  constructor(private readonly client: Client) { }

  async bulkSetIssuesProperties(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issue/properties',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async bulkSetIssueProperty(parameters: {
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async bulkDeleteIssueProperty(parameters: {
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuePropertyKeys(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<PropertyKeysResponse>): Promise<PropertyKeysResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueProperty(parameters: {
    issueIdOrKey: string;
    propertyKey: string;
  }, callback?: Callback<EntityPropertyResponse>): Promise<EntityPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setIssueProperty(parameters: {
    issueIdOrKey: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueProperty(parameters: {
    issueIdOrKey: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
