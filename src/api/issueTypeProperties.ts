import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PropertyKeys, EntityProperty } from '../schemas';
export class IssueTypeProperties {
  constructor(private readonly client: Sender) {}

  public async getIssueTypePropertyKeys(
    params: {
      issueTypeId: string;
    },
    callback?: Callback<PropertyKeys>,
  ): Promise<PropertyKeys> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetype/${params.issueTypeId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeProperty(
    params: {
      issueTypeId: string;
      propertyKey: string;
    },
    callback?: Callback<EntityProperty>,
  ): Promise<EntityProperty> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetype/${params.issueTypeId}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setIssueTypeProperty(
    params: {
      issueTypeId: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetype/${params.issueTypeId}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: { ...params, issueTypeId: undefined, propertyKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueTypeProperty(
    params: {
      issueTypeId: string;
      propertyKey: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuetype/${params.issueTypeId}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
