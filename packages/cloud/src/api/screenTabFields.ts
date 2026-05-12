import { ScreenableFieldSchema, type ScreenableField } from '#/models/screenableField';
import { type GetAllScreenTabFields } from '#/parameters/getAllScreenTabFields';
import { type AddScreenTabField } from '#/parameters/addScreenTabField';
import { type RemoveScreenTabField } from '#/parameters/removeScreenTabField';
import { type MoveScreenTabField } from '#/parameters/moveScreenTabField';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns all fields for a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
 *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
 *   Scheme.
 */
export async function getAllScreenTabFields(
  client: Client,
  parameters: GetAllScreenTabFields,
): Promise<ScreenableField[]> {
  const config: SendRequestOptions<ScreenableField[]> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
    method: 'GET',
    searchParams: {
      projectKey: parameters.projectKey,
    },
    schema: z.array(ScreenableFieldSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Adds a field to a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addScreenTabField(client: Client, parameters: AddScreenTabField): Promise<ScreenableField> {
  const config: SendRequestOptions<ScreenableField> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
    method: 'POST',
    body: {
      fieldId: parameters.fieldId,
    },
    schema: ScreenableFieldSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes a field from a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeScreenTabField(client: Client, parameters: RemoveScreenTabField): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Moves a screen tab field.
 *
 * If `after` and `position` are provided in the request, `position` is ignored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function moveScreenTabField(client: Client, parameters: MoveScreenTabField): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
    method: 'POST',
    body: {
      after: parameters.after,
      position: parameters.position,
    },
  };

  return await client.sendRequest(config);
}
