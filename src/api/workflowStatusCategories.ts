import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class WorkflowStatusCategories {
  constructor(private readonly client: Sender) {}

  public async getAllStatusCategories(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/statuscategory',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getStatusCategory(
    params: {
      idOrKey: string;
    },
    callback?: Callback,
  ): Promise<Schemas.StatusCategory> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/statuscategory/${params.idOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
