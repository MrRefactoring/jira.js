import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueResolutions {
  constructor(private client: Client) { }
  async getResolutions<T = any>(callback?: Callback<T>): Promise<void>;
  async getResolutions<T = any>(callback?: undefined): Promise<T>;
  async getResolutions<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/resolution',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback: Callback<T>): Promise<void>;
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback?: undefined): Promise<T>;
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
