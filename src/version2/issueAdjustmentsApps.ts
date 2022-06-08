import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueAdjustmentsApps {
  constructor(private client: Client) {}

  /**
   * @deprecated Gets issue adjustments. Issue adjustments can only be retrieved by Forge apps.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssueAdjustments<T = Models.PageIssueAdjustmentDetails>(
    parameters: Parameters.GetIssueAdjustments | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Gets issue adjustments. Issue adjustments can only be retrieved by Forge apps.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssueAdjustments<T = Models.PageIssueAdjustmentDetails>(
    parameters?: Parameters.GetIssueAdjustments,
    callback?: never
  ): Promise<T>;
  async getIssueAdjustments<T = Models.PageIssueAdjustmentDetails>(
    parameters?: Parameters.GetIssueAdjustments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueAdjustments',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Creates an issue adjustment. Issue adjustment can only be created by Forge apps.
   *
   *   Each app can define up to 100 issue adjustments. Each issue adjustment can define up to 1000 contexts.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *   - _None_ if the issue adjustment is created without contexts.
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       issue adjustment is created with contexts.
   */
  async createIssueAdjustment<T = Models.IssueAdjustmentIdentifiers>(
    parameters: Parameters.CreateIssueAdjustment | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Creates an issue adjustment. Issue adjustment can only be created by Forge apps.
   *
   *   Each app can define up to 100 issue adjustments. Each issue adjustment can define up to 1000 contexts.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *   - _None_ if the issue adjustment is created without contexts.
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       issue adjustment is created with contexts.
   */
  async createIssueAdjustment<T = Models.IssueAdjustmentIdentifiers>(
    parameters?: Parameters.CreateIssueAdjustment,
    callback?: never
  ): Promise<T>;
  async createIssueAdjustment<T = Models.IssueAdjustmentIdentifiers>(
    parameters?: Parameters.CreateIssueAdjustment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueAdjustments',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        data: parameters?.data,
        contexts: parameters?.contexts,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Updates an issue adjustment. Issue adjustment can only be updated by Forge apps.
   *
   *   Each issue adjustment can define up to 1000 contexts.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *   - _None_ if the issue adjustment is created without contexts.
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       issue adjustment is created with contexts.
   */
  async updateIssueAdjustment<T = void>(
    parameters: Parameters.UpdateIssueAdjustment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Updates an issue adjustment. Issue adjustment can only be updated by Forge apps.
   *
   *   Each issue adjustment can define up to 1000 contexts.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *   - _None_ if the issue adjustment is created without contexts.
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       issue adjustment is created with contexts.
   */
  async updateIssueAdjustment<T = void>(parameters: Parameters.UpdateIssueAdjustment, callback?: never): Promise<T>;
  async updateIssueAdjustment<T = void>(
    parameters: Parameters.UpdateIssueAdjustment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueAdjustments/${parameters.issueAdjustmentId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        data: parameters.data,
        contexts: parameters.contexts,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Deletes an issue adjustment. All the contexts that belong to the issue adjustment are deleted too.
   *   Issue adjustment can only be deleted by Forge apps.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async deleteIssueAdjustment<T = void>(
    parameters: Parameters.DeleteIssueAdjustment,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Deletes an issue adjustment. All the contexts that belong to the issue adjustment are deleted too.
   *   Issue adjustment can only be deleted by Forge apps.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async deleteIssueAdjustment<T = void>(parameters: Parameters.DeleteIssueAdjustment, callback?: never): Promise<T>;
  async deleteIssueAdjustment<T = void>(
    parameters: Parameters.DeleteIssueAdjustment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueAdjustments/${parameters.issueAdjustmentId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
