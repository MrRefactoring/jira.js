import { PageUiModificationDetailsSchema, type PageUiModificationDetails } from '#/models/pageUiModificationDetails';
import { UiModificationIdentifiersSchema, type UiModificationIdentifiers } from '#/models/uiModificationIdentifiers';
import { type GetUiModifications } from '#/parameters/getUiModifications';
import { type CreateUiModification } from '#/parameters/createUiModification';
import { type UpdateUiModification } from '#/parameters/updateUiModification';
import { type DeleteUiModification } from '#/parameters/deleteUiModification';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 *
 * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function getUiModifications(
  client: Client,
  parameters?: GetUiModifications,
): Promise<PageUiModificationDetails> {
  const config: SendRequestOptions<PageUiModificationDetails> = {
    url: '/rest/api/3/uiModifications',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      expand: parameters?.expand,
    },
    schema: PageUiModificationDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a UI modification. UI modification can only be created by Forge apps.
 *
 * Each app can define up to 3000 UI modifications. Each UI modification can define up to 1000 contexts. The same
 * context can be assigned to maximum 100 UI modifications.
 *
 * **Context types:**
 *
 * - **Jira contexts:** For Jira view types, use `projectId` and `issueTypeId`. One field can act as a wildcard. Supported
 *   Jira views:
 *
 *   - `GIC` - Jira global issue create
 *   - `IssueView` - Jira issue view
 *   - `IssueTransition` - Jira issue transition
 * - **Jira Service Management contexts:** For Jira Service Management view types, use `portalId` and `requestTypeId`.
 *   Wildcards are not supported. Supported JSM views:
 *
 *   - `JSMRequestCreate` - Jira Service Management request create portal view
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _None_ if the UI modification is created without contexts.
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the UI
 *   modification is created with contexts.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function createUiModification(
  client: Client,
  parameters: CreateUiModification,
): Promise<UiModificationIdentifiers> {
  const config: SendRequestOptions<UiModificationIdentifiers> = {
    url: '/rest/api/3/uiModifications',
    method: 'POST',
    body: {
      contexts: parameters.contexts,
      data: parameters.data,
      description: parameters.description,
      name: parameters.name,
    },
    schema: UiModificationIdentifiersSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a UI modification. UI modification can only be updated by Forge apps.
 *
 * Each UI modification can define up to 1000 contexts. The same context can be assigned to maximum 100 UI
 * modifications.
 *
 * **Context types:**
 *
 * - **Jira contexts:** For Jira view types, use `projectId` and `issueTypeId`. One field can act as a wildcard. Supported
 *   Jira views:
 *
 *   - `GIC` - Jira global issue create
 *   - `IssueView` - Jira issue view
 *   - `IssueTransition` - Jira issue transition
 * - **Jira Service Management contexts:** For Jira Service Management view types, use `portalId` and `requestTypeId`.
 *   Wildcards are not supported. Supported JSM views:
 *
 *   - `JSMRequestCreate` - Jira Service Management request create portal view
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _None_ if the UI modification is created without contexts.
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the UI
 *   modification is created with contexts.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function updateUiModification(client: Client, parameters: UpdateUiModification): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/uiModifications/${parameters.uiModificationId}`,
    method: 'PUT',
    body: {
      contexts: parameters.contexts,
      data: parameters.data,
      description: parameters.description,
      name: parameters.name,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
 * only be deleted by Forge apps.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function deleteUiModification(client: Client, parameters: DeleteUiModification): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/uiModifications/${parameters.uiModificationId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
