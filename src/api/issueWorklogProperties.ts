import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PropertyKeys, EntityProperty } from '../schemas';
export class IssueWorklogProperties {
  constructor(private readonly client: Sender) {}

  public async getWorklogPropertyKeys(
    params: {
      issueIdOrKey: string;
      worklogId: string;
    },
    callback?: Callback<PropertyKeys>,
  ): Promise<PropertyKeys> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorklogProperty(
    params: {
      issueIdOrKey: string;
      worklogId: string;
      propertyKey: string;
    },
    callback?: Callback<EntityProperty>,
  ): Promise<EntityProperty> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setWorklogProperty(
    params: {
      issueIdOrKey: string;
      worklogId: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: {
        ...params,
        issueIdOrKey: undefined,
        worklogId: undefined,
        propertyKey: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWorklogProperty(
    params: {
      issueIdOrKey: string;
      worklogId: string;
      propertyKey: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
