import { ScreenableTabSchema, type ScreenableTab } from '#/models/screenableTab';
import { type GetAllScreenTabs } from '#/parameters/getAllScreenTabs';
import { type AddScreenTab } from '#/parameters/addScreenTab';
import { type RenameScreenTab } from '#/parameters/renameScreenTab';
import { type DeleteScreenTab } from '#/parameters/deleteScreenTab';
import { type MoveScreenTab } from '#/parameters/moveScreenTab';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns the list of tabs for a screen.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
 *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
 *   Scheme.
 */
export async function getAllScreenTabs(client: Client, parameters: GetAllScreenTabs): Promise<ScreenableTab[]> {
  const config: SendRequestOptions<ScreenableTab[]> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
    method: 'GET',
    searchParams: {
      projectKey: parameters.projectKey,
    },
    schema: z.array(ScreenableTabSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates a tab for a screen.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addScreenTab(client: Client, parameters: AddScreenTab): Promise<ScreenableTab> {
  const config: SendRequestOptions<ScreenableTab> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
    method: 'POST',
    body: {
      id: parameters.id,
      name: parameters.name,
    },
    schema: ScreenableTabSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the name of a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function renameScreenTab(client: Client, parameters: RenameScreenTab): Promise<ScreenableTab> {
  const config: SendRequestOptions<ScreenableTab> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
    method: 'PUT',
    body: {
      id: parameters.id,
      name: parameters.name,
    },
    schema: ScreenableTabSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteScreenTab(client: Client, parameters: DeleteScreenTab): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Moves a screen tab.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function moveScreenTab(client: Client, parameters: MoveScreenTab): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}
