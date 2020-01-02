import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ProjectTypes {
  constructor(private readonly client: Sender) {}

  public async getAllProjectTypes(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/project/type',
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectTypeByKey(
    params: {
      projectTypeKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/type/${params.projectTypeKey}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAccessibleProjectTypeByKey(
    params: {
      projectTypeKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/type/${params.projectTypeKey}/accessible`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }
}
