import { PageScreenWithTabSchema, type PageScreenWithTab } from '#/models/pageScreenWithTab';
import { PageScreenSchema, type PageScreen } from '#/models/pageScreen';
import { ScreenableFieldSchema, type ScreenableField } from '#/models/screenableField';
import { type GetScreensForField } from '#/parameters/getScreensForField';
import { type GetScreens } from '#/parameters/getScreens';
import { type AddFieldToDefaultScreen } from '#/parameters/addFieldToDefaultScreen';
import { type GetAvailableScreenFields } from '#/parameters/getAvailableScreenFields';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of the
 * screens a field is used in.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getScreensForField(client: Client, parameters: GetScreensForField): Promise<PageScreenWithTab> {
  const config: SendRequestOptions<PageScreenWithTab> = {
    url: `/rest/api/3/field/${parameters.fieldId}/screens`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      expand: parameters.expand,
    },
    schema: PageScreenWithTabSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * screens or those specified by one or more screen IDs.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getScreens(client: Client, parameters?: GetScreens): Promise<PageScreen> {
  const config: SendRequestOptions<PageScreen> = {
    url: '/rest/api/3/screens',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      queryString: parameters?.queryString,
      scope: parameters?.scope,
      orderBy: parameters?.orderBy,
    },
    schema: PageScreenSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a field to the default tab of the default screen.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addFieldToDefaultScreen(client: Client, parameters: AddFieldToDefaultScreen): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/screens/addToDefault/${parameters.fieldId}`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the fields that can be added to a tab on a screen.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAvailableScreenFields(
  client: Client,
  parameters: GetAvailableScreenFields,
): Promise<ScreenableField[]> {
  const config: SendRequestOptions<ScreenableField[]> = {
    url: `/rest/api/3/screens/${parameters.screenId}/availableFields`,
    method: 'GET',
    schema: z.array(ScreenableFieldSchema),
  };

  return await client.sendRequest(config);
}
