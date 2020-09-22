import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class IssueProperties {
  constructor(private readonly client: Sender) {}

  public async bulkSetIssuesProperties(
    params?: {
      entitiesIds?: Array<number>;
      properties?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue/properties',
      method: 'POST',
      data: {
        entitiesIds: params.entitiesIds,
        properties: params.properties,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async bulkSetIssueProperty(
    params: {
      propertyKey: string;
      value?: any;
      filter?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/properties/${params.propertyKey}`,
      method: 'PUT',
      data: {
        value: params.value,
        filter: params.filter,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async bulkDeleteIssueProperty(
    params: {
      propertyKey: string;
      entityIds?: Array<number>;
      currentValue?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/properties/${params.propertyKey}`,
      method: 'DELETE',
      data: {
        entityIds: params.entityIds,
        currentValue: params.currentValue,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuePropertyKeys(
    params: {
      issueIdOrKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueProperty(
    params: {
      issueIdOrKey: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setIssueProperty(
    params: {
      issueIdOrKey: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: { ...params, issueIdOrKey: undefined, propertyKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueProperty(
    params: {
      issueIdOrKey: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
