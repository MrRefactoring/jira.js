import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueNavigatorSettings {
  constructor(private readonly client: Sender) {}

  public async getIssueNavigatorDefaultColumns(
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setIssueNavigatorDefaultColumns(
    params: {
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'PUT',
      data: { ...params },
    };

    return this.client.sendRequest(request, callback);
  }
}
