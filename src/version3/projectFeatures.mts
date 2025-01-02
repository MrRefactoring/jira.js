import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import type { Callback } from '@/callback.mjs';
import type { Client } from '../clients/index.mjs';
import type { RequestConfig } from '@/requestConfig.mjs';

export class ProjectFeatures {
  constructor(private client: Client) {}

  /** Returns the list of features for a project. */
  async getFeaturesForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.GetFeaturesForProject | string,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns the list of features for a project. */
  async getFeaturesForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.GetFeaturesForProject | string,
    callback?: never,
  ): Promise<T>;
  async getFeaturesForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.GetFeaturesForProject | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/3/project/${projectIdOrKey}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Sets the state of a project feature. */
  async toggleFeatureForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.ToggleFeatureForProject,
    callback: Callback<T>,
  ): Promise<void>;
  /** Sets the state of a project feature. */
  async toggleFeatureForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.ToggleFeatureForProject,
    callback?: never,
  ): Promise<T>;
  async toggleFeatureForProject<T = Models.ContainerForProjectFeatures>(
    parameters: Parameters.ToggleFeatureForProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/features/${parameters.featureKey}`,
      method: 'PUT',
      data: {
        state: parameters.state,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
