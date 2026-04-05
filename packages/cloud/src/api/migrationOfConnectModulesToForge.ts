import { TaskProgressSchema, type TaskProgress } from '#/models/taskProgress';
import { type FetchMigrationTask } from '#/parameters/fetchMigrationTask';
import { type SubmitTask } from '#/parameters/submitTask';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the details of a Connect issue field's migration to Forge.
 *
 * When migrating a Connect app to Forge, [Issue
 * Field](https://developer.atlassian.com/cloud/jira/software/modules/issue-field/) modules must be converted to [Custom
 * field](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/). When the Forge
 * version of the app is installed, Forge creates a [background
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks) to track the
 * migration of field data across. This endpoint returns the status and other details of that background task.
 *
 * For more details, see [Jira modules > Jira Custom
 * Fields](https://developer.atlassian.com/platform/adopting-forge-from-connect/migrate-jira-custom-fields/).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect and Forge apps can make this request.
 */
export async function fetchMigrationTask(client: Client, parameters: FetchMigrationTask): Promise<TaskProgress> {
  const config: SendRequestOptions<TaskProgress> = {
    url: `/rest/atlassian-connect/1/migration/${parameters.connectKey}/${parameters.jiraIssueFieldsKey}/task`,
    method: 'GET',
    schema: TaskProgressSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Submits a request to trigger migration of connect issue field to its Forge custom field counterpart.
 *
 * When migrating a Connect app to Forge, [Issue
 * Field](https://developer.atlassian.com/cloud/jira/software/modules/issue-field/) modules must be converted to [Custom
 * field](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) modules. This
 * endpoint triggers the background migration of field data. Use the GET endpoint to retrieve the status and progress of
 * the task.
 *
 * For more details, see [Jira modules > Jira Custom
 * Fields](https://developer.atlassian.com/platform/adopting-forge-from-connect/migrate-jira-custom-fields/).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect and Forge apps can make this request.
 */
export async function submitTask(client: Client, parameters: SubmitTask): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/atlassian-connect/1/migration/${parameters.connectKey}/${parameters.jiraIssueFieldsKey}/task`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}
