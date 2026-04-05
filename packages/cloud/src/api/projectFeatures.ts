import {
  ContainerForProjectFeaturesSchema,
  type ContainerForProjectFeatures,
} from '#/models/containerForProjectFeatures';
import { type GetFeaturesForProject } from '#/parameters/getFeaturesForProject';
import { type ToggleFeatureForProject } from '#/parameters/toggleFeatureForProject';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/** Returns the list of features for a project. */
export async function getFeaturesForProject(
  client: Client,
  parameters: GetFeaturesForProject,
): Promise<ContainerForProjectFeatures> {
  const config: SendRequestOptions<ContainerForProjectFeatures> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/features`,
    method: 'GET',
    schema: ContainerForProjectFeaturesSchema,
  };

  return await client.sendRequest(config);
}

/** Sets the state of a project feature. */
export async function toggleFeatureForProject(
  client: Client,
  parameters: ToggleFeatureForProject,
): Promise<ContainerForProjectFeatures> {
  const config: SendRequestOptions<ContainerForProjectFeatures> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/features/${parameters.featureKey}`,
    method: 'PUT',
    body: {
      state: parameters.state,
    },
    schema: ContainerForProjectFeaturesSchema,
  };

  return await client.sendRequest(config);
}
