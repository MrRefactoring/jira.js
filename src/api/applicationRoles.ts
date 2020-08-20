import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { ApplicationRole } from '../schemas';
export class ApplicationRoles {
  constructor(private readonly client: Sender) {}

  public async getAllApplicationRoles(callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/applicationrole',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getApplicationRole(
    params: {
      key: string;
    },
    callback?: Callback<ApplicationRole>,
  ): Promise<ApplicationRole> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/applicationrole/${params.key}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
