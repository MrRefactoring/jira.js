import type { Client } from '../client';
import type { Request } from '../request';
import type { GetFeaturesForProjectParameters } from './parameters/getFeaturesForProjectParameters';
import type { ToggleFeatureForProjectParameters } from './parameters/toggleFeatureForProjectParameters';

export class ProjectFeatures {
  constructor(private client: Client) {}
  /** Returns the list of features for a project. */
  async getFeaturesForProject(parameters: GetFeaturesForProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /** Sets the state of a project feature. */
  async toggleFeatureForProject(parameters: ToggleFeatureForProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/features/${parameters.featureKey}`,
      method: 'PUT',
      body: {
        state: parameters.state,
      },
    };

    return this.client.sendRequest(request);
  }
}
