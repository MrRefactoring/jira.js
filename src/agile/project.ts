import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Project {
  constructor(private client: Client) { }
  async getFeaturesForProject<T = any>(parameters: Parameters.GetFeaturesForProject, callback: Callback<T>): Promise<void>;
  async getFeaturesForProject<T = any>(parameters: Parameters.GetFeaturesForProject, callback?: undefined): Promise<T>;
  async getFeaturesForProject<T = any>(parameters: Parameters.GetFeaturesForProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/project/${parameters.projectIdOrKey}/features`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
