import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueWorklogProperties {
  constructor(private readonly client: Sender) {}

  public async getWorklogPropertyKeys(
    params: {
      issueIdOrKey: string;
      worklogId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getWorklogProperty(
    params: {
      issueIdOrKey: string;
      worklogId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'GET'
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
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: {
        ...params,
        issueIdOrKey: undefined,
        worklogId: undefined,
        propertyKey: undefined
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteWorklogProperty(
    params: {
      issueIdOrKey: string;
      worklogId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.worklogId}/properties/${params.propertyKey}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }
}
