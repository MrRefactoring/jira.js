import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PropertyKeys, EntityProperty } from '../schemas';
export class ProjectProperties {
  constructor(private readonly client: Sender) {}

  public async getProjectPropertyKeys(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback<PropertyKeys>,
  ): Promise<PropertyKeys> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjectProperty(
    params: {
      projectIdOrKey: string;
      propertyKey: string;
    },
    callback?: Callback<EntityProperty>,
  ): Promise<EntityProperty> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setProjectProperty(
    params: {
      projectIdOrKey: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: { ...params, projectIdOrKey: undefined, propertyKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteProjectProperty(
    params: {
      projectIdOrKey: string;
      propertyKey: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
