import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class AppProperties {
  constructor(private readonly client: Sender) {}

  public async getAppProperties(
    params: {
      addonKey: string;
    },
    callback?: Callback,
  ): Promise<Schemas.PropertyKeys> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${params.addonKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAppProperty(
    params: {
      addonKey: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<Schemas.EntityProperty> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${params.addonKey}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setAppProperty(
    params: {
      addonKey: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<Schemas.OperationMessage> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${params.addonKey}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: { ...params, addonKey: undefined, propertyKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteAppProperty(
    params: {
      addonKey: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${params.addonKey}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
