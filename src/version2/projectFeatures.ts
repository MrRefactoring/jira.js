import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectFeatures {
  constructor(private client: Client) {
  }

  /**
   * Returns the list of features for a project. The project must be a [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/) project.
   */
  async getFeaturesForProject<T = Models.ProjectFeatures>(parameters: Parameters.GetFeaturesForProject, callback: Callback<T>): Promise<void>;
  /**
   * Returns the list of features for a project. The project must be a [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/) project.
   */
  async getFeaturesForProject<T = Models.ProjectFeatures>(parameters: Parameters.GetFeaturesForProject, callback?: never): Promise<T>;
  async getFeaturesForProject<T = Models.ProjectFeatures>(parameters: Parameters.GetFeaturesForProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectFeatures.getFeaturesForProject' });
  }

  /**
   * Changes the state of a feature to ENABLED or DISABLED for the project. The project must be a [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/) project.
   */
  async toggleFeatureForProject<T = Models.ProjectFeatures>(parameters: Parameters.ToggleFeatureForProject, callback: Callback<T>): Promise<void>;
  /**
   * Changes the state of a feature to ENABLED or DISABLED for the project. The project must be a [company-managed](https://support.atlassian.com/jira-service-management-cloud/docs/learn-the-differences-between-classic-and-next-gen-projects/) project.
   */
  async toggleFeatureForProject<T = Models.ProjectFeatures>(parameters: Parameters.ToggleFeatureForProject, callback?: never): Promise<T>;
  async toggleFeatureForProject<T = Models.ProjectFeatures>(parameters: Parameters.ToggleFeatureForProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/features/${parameters.featureKey}`,
      method: 'PUT',
      data: {
        state: parameters.state,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectFeatures.toggleFeatureForProject' });
  }
}
