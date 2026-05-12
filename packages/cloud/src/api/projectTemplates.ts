import { type CreateProjectWithCustomTemplate } from '#/parameters/createProjectWithCustomTemplate';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Creates a project based on a custom template provided in the request.
 *
 * The request body should contain the project details and the capabilities that comprise the project:
 *
 * - `details` - represents the project details settings
 * - `template` - represents a list of capabilities responsible for creating specific parts of a project
 *
 * A capability is defined as a unit of configuration for the project you want to create.
 *
 * This operation is:
 *
 * - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async). Follow the `Location` link
 *   in the response header to determine the status of the task and use [Get
 *   task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-task/#api-rest-api-3-task-taskId-get)
 *   to obtain subsequent updates.
 *
 * _**Note: This API is only supported for Jira Enterprise edition.**_
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createProjectWithCustomTemplate(
  client: Client,
  parameters: CreateProjectWithCustomTemplate,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/project-template',
    method: 'POST',
    body: {
      details: parameters.details,
      template: parameters.template,
    },
  };

  return await client.sendRequest(config);
}
