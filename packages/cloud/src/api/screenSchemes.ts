import { PageScreenSchemeSchema, type PageScreenScheme } from '#/models/pageScreenScheme';
import { ScreenSchemeIdSchema, type ScreenSchemeId } from '#/models/screenSchemeId';
import { type GetScreenSchemes } from '#/parameters/getScreenSchemes';
import { type CreateScreenScheme } from '#/parameters/createScreenScheme';
import { type UpdateScreenScheme } from '#/parameters/updateScreenScheme';
import { type DeleteScreenScheme } from '#/parameters/deleteScreenScheme';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of screen
 * schemes.
 *
 * Only screen schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getScreenSchemes(client: Client, parameters?: GetScreenSchemes): Promise<PageScreenScheme> {
  const config: SendRequestOptions<PageScreenScheme> = {
    url: '/rest/api/3/screenscheme',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      expand: parameters?.expand,
      queryString: parameters?.queryString,
      orderBy: parameters?.orderBy,
    },
    schema: PageScreenSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createScreenScheme(client: Client, parameters: CreateScreenScheme): Promise<ScreenSchemeId> {
  const config: SendRequestOptions<ScreenSchemeId> = {
    url: '/rest/api/3/screenscheme',
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
      screens: parameters.screens,
    },
    schema: ScreenSchemeIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a screen scheme. Only screen schemes used in classic projects can be updated.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateScreenScheme(client: Client, parameters: UpdateScreenScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screenscheme/${parameters.screenSchemeId}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
      screens: parameters.screens,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.
 *
 * Only screens schemes used in classic projects can be deleted.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteScreenScheme(client: Client, parameters: DeleteScreenScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/screenscheme/${parameters.screenSchemeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
