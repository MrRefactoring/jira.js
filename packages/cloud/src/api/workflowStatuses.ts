import { StatusDetailsSchema, type StatusDetails } from '#/models/statusDetails';
import { type GetStatus } from '#/parameters/getStatus';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a list of all statuses associated with active workflows.
 *
 * This operation can be accessed anonymously.
 *
 * [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required: _Browse
 * projects_ [project
 * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the
 * project.
 */
export async function getStatuses(client: Client): Promise<StatusDetails[]> {
  const config: SendRequestOptions<StatusDetails[]> = {
    url: '/rest/api/3/status',
    method: 'GET',
    schema: z.array(StatusDetailsSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a status. The status must be associated with an active workflow to be returned.
 *
 * If a name is used on more than one status, only the status found first is returned. Therefore, identifying the status
 * by its ID may be preferable.
 *
 * This operation can be accessed anonymously.
 *
 * [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required: _Browse
 * projects_ [project
 * permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the
 * project.
 */
export async function getStatus(client: Client, parameters: GetStatus): Promise<StatusDetails> {
  const config: SendRequestOptions<StatusDetails> = {
    url: `/rest/api/3/status/${parameters.idOrName}`,
    method: 'GET',
    schema: StatusDetailsSchema,
  };

  return await client.sendRequest(config);
}
