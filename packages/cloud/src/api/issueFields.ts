import { FieldDetailsSchema, type FieldDetails } from '#/models/fieldDetails';
import { PageFieldSchema, type PageField } from '#/models/pageField';
import { type CreateCustomField } from '#/parameters/createCustomField';
import { type GetFieldsPaginated } from '#/parameters/getFieldsPaginated';
import { type GetTrashedFieldsPaginated } from '#/parameters/getTrashedFieldsPaginated';
import { type UpdateCustomField } from '#/parameters/updateCustomField';
import { type DeleteCustomField } from '#/parameters/deleteCustomField';
import { type RestoreCustomField } from '#/parameters/restoreCustomField';
import { type TrashCustomField } from '#/parameters/trashCustomField';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns system and custom issue fields according to the following rules:
 *
 * - Fields that cannot be added to the issue navigator are always returned.
 * - Fields that cannot be placed on an issue screen are always returned.
 * - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields,
 *   subtasks, votes, and watches.
 * - Fields that are not associated to any used field configurations or screens are not returned.
 * - For all other fields, this operation only returns the fields that the user has permission to view (that is, the field
 *   is used in at least one project that the user has _Browse Projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.)
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getFields(client: Client): Promise<FieldDetails[]> {
  const config: SendRequestOptions<FieldDetails[]> = {
    url: '/rest/api/3/field',
    method: 'GET',
    schema: z.array(FieldDetailsSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates a custom field.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createCustomField(client: Client, parameters: CreateCustomField): Promise<FieldDetails> {
  const config: SendRequestOptions<FieldDetails> = {
    url: '/rest/api/3/field',
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
      searcherKey: parameters.searcherKey,
      type: parameters.type,
    },
    schema: FieldDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of fields
 * for Classic Jira projects. The list can include:
 *
 * - All fields
 * - Specific fields, by defining `id`
 * - Fields that contain a string in the field name or description, by defining `query`
 * - Specific fields that contain a string in the field name or description, by defining `id` and `query`
 *
 * Use `type` must be set to `custom` to show custom fields only.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getFieldsPaginated(client: Client, parameters?: GetFieldsPaginated): Promise<PageField> {
  const config: SendRequestOptions<PageField> = {
    url: '/rest/api/3/field/search',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      type: parameters?.type,
      id: parameters?.id,
      query: parameters?.query,
      orderBy: parameters?.orderBy,
      expand: parameters?.expand,
      projectIds: parameters?.projectIds,
    },
    schema: PageFieldSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of fields in
 * the trash. The list may be restricted to fields whose field name or description partially match a string.
 *
 * Only custom fields can be queried, `type` must be set to `custom`.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getTrashedFieldsPaginated(
  client: Client,
  parameters?: GetTrashedFieldsPaginated,
): Promise<PageField> {
  const config: SendRequestOptions<PageField> = {
    url: '/rest/api/3/field/search/trashed',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      query: parameters?.query,
      expand: parameters?.expand,
      orderBy: parameters?.orderBy,
    },
    schema: PageFieldSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a custom field.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateCustomField(client: Client, parameters: UpdateCustomField): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
      searcherKey: parameters.searcherKey,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a custom field. The custom field is deleted whether it is in the trash or not. See [Edit or delete a custom
 * field](https://confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.
 *
 * This operation is [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async). Follow the
 * `location` link in the response to determine the status of the task and use [Get
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-task/#api-rest-api-3-task-taskId-get) to
 * obtain subsequent updates.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteCustomField(client: Client, parameters: DeleteCustomField): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/field/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Restores a custom field from trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw)
 * for more information on trashing and deleting custom fields.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function restoreCustomField(client: Client, parameters: RestoreCustomField): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/field/${parameters.id}/restore`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Moves a custom field to trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw) for
 * more information on trashing and deleting custom fields.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function trashCustomField(client: Client, parameters: TrashCustomField): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/field/${parameters.id}/trash`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}
