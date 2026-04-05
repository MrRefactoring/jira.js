import { ProjectEmailAddressSchema, type ProjectEmailAddress } from '#/models/projectEmailAddress';
import { type GetProjectEmail } from '#/parameters/getProjectEmail';
import { type UpdateProjectEmail } from '#/parameters/updateProjectEmail';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectEmail(client: Client, parameters: GetProjectEmail): Promise<ProjectEmailAddress> {
  const config: SendRequestOptions<ProjectEmailAddress> = {
    url: `/rest/api/3/project/${parameters.projectId}/email`,
    method: 'GET',
    schema: ProjectEmailAddressSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
 *
 * If `emailAddress` is an empty string, the default email address is restored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function updateProjectEmail(client: Client, parameters: UpdateProjectEmail): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/project/${parameters.projectId}/email`,
    method: 'PUT',
    body: {
      emailAddress: parameters.emailAddress,
      emailAddressStatus: parameters.emailAddressStatus,
    },
  };

  return await client.sendRequest(config);
}
