import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

/** @deprecated Will be removed in the next major version. */
export class Project {
  constructor(private client: Client) {}

  /** @deprecated Will be removed in the next major version. */
  async getFeaturesForProject<T = Models.GetFeaturesForProject>(
    parameters: Parameters.GetFeaturesForProject,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. */
  async getFeaturesForProject<T = Models.GetFeaturesForProject>(
    parameters: Parameters.GetFeaturesForProject,
    callback?: never
  ): Promise<T>;
  async getFeaturesForProject<T = Models.GetFeaturesForProject>(
    parameters: Parameters.GetFeaturesForProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/agile/1.0/project/${parameters.projectIdOrKey}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
