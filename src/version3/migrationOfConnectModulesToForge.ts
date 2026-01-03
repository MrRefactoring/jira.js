import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class MigrationOfConnectModulesToForge {
  constructor(private client: Client) {}

  /**
   * Returns the details of a Connect issue field's migration to Forge.
   *
   * When migrating a Connect app to Forge, [Issue
   * Field](https://developer.atlassian.com/cloud/jira/software/modules/issue-field/) modules must be converted to
   * [Custom field](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/). When
   * the Forge version of the app is installed, Forge creates a [background
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks) to track the
   * migration of field data across. This endpoint returns the status and other details of that background task.
   *
   * For more details, see [Jira modules > Jira Custom
   * Fields](https://developer.atlassian.com/platform/adopting-forge-from-connect/migrate-jira-custom-fields/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect and Forge apps can make this request.
   */
  async fetchMigrationTask<T = Models.TaskProgress>(
    parameters: Parameters.FetchMigrationTask,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the details of a Connect issue field's migration to Forge.
   *
   * When migrating a Connect app to Forge, [Issue
   * Field](https://developer.atlassian.com/cloud/jira/software/modules/issue-field/) modules must be converted to
   * [Custom field](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/). When
   * the Forge version of the app is installed, Forge creates a [background
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks) to track the
   * migration of field data across. This endpoint returns the status and other details of that background task.
   *
   * For more details, see [Jira modules > Jira Custom
   * Fields](https://developer.atlassian.com/platform/adopting-forge-from-connect/migrate-jira-custom-fields/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect and Forge apps can make this request.
   */
  async fetchMigrationTask<T = Models.TaskProgress>(
    parameters: Parameters.FetchMigrationTask,
    callback?: never,
  ): Promise<T>;
  async fetchMigrationTask<T = Models.TaskProgress>(
    parameters: Parameters.FetchMigrationTask,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/migration/${parameters.connectKey}/${parameters.jiraIssueFieldsKey}/task`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
