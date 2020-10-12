import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PropertyKeys as PropertyKeysResponse, EntityProperty as EntityPropertyResponse, OperationMessage as OperationMessageResponse } from '../../models/v2';

export class AppProperties {
  constructor(private readonly client: Client) { }

  async getAddonProperties(parameters: {
    addonKey: string;
  }, callback?: Callback<PropertyKeysResponse>): Promise<PropertyKeysResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAddonProperty(parameters: {
    addonKey: string;
    propertyKey: string;
  }, callback?: Callback<EntityPropertyResponse>): Promise<EntityPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async putAddonProperty(parameters: {
    addonKey: string;
    propertyKey: string;
  }, callback?: Callback<OperationMessageResponse>): Promise<OperationMessageResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteAddonProperty(parameters: {
    addonKey: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
