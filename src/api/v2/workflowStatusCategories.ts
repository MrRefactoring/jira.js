import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { StatusCategory as StatusCategoryResponse } from '../../models/v2';

export class WorkflowStatusCategories {
  constructor(private readonly client: Client) { }

  async getStatusCategories(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/statuscategory',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getStatusCategory(parameters: {
    idOrKey: string;
  }, callback?: Callback<StatusCategoryResponse>): Promise<StatusCategoryResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/statuscategory/${parameters.idOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
