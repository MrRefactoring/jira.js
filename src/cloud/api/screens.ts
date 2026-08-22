import { PageScreenWithTabSchema } from '../models/pageScreenWithTab';
import type { Page } from '../models/page';
import type { ScreenWithTab } from '../models/screenWithTab';
import { PageScreenSchema } from '../models/pageScreen';
import type { Screen } from '../models/screen';
import { ScreenableFieldSchema, type ScreenableField } from '../models/screenableField';
import type { GetScreensForField } from '../parameters/getScreensForField';
import type { GetScreens } from '../parameters/getScreens';
import type { AddFieldToDefaultScreen } from '../parameters/addFieldToDefaultScreen';
import type { GetAvailableScreenFields } from '../parameters/getAvailableScreenFields';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of the
 * screens a field is used in.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getScreensForField(
  client: Client,
  parameters: GetScreensForField,
  options?: RequestOptions,
): Promise<Page<ScreenWithTab>> {
  const config: SendRequestOptions<Page<ScreenWithTab>> = {
    url: `/rest/api/3/field/${parameters.fieldId}/screens`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      expand: parameters.expand,
    },
    schema: PageScreenWithTabSchema,
    signal: options?.signal,
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
export async function getScreens(
  client: Client,
  parameters?: GetScreens,
  options?: RequestOptions,
): Promise<Page<Screen>> {
  const config: SendRequestOptions<Page<Screen>> = {
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
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a field to the default tab of the default screen.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addFieldToDefaultScreen(
  client: Client,
  parameters: AddFieldToDefaultScreen,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screens/addToDefault/${parameters.fieldId}`,
    method: 'POST',
    signal: options?.signal,
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
  options?: RequestOptions,
): Promise<ScreenableField[]> {
  const config: SendRequestOptions<ScreenableField[]> = {
    url: `/rest/api/3/screens/${parameters.screenId}/availableFields`,
    method: 'GET',
    schema: z.array(ScreenableFieldSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
