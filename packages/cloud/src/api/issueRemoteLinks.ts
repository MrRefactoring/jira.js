import { RemoteIssueLinkIdentifiesSchema, type RemoteIssueLinkIdentifies } from '#/models/remoteIssueLinkIdentifies';
import { RemoteIssueLinkSchema, type RemoteIssueLink } from '#/models/remoteIssueLink';
import { type GetRemoteIssueLinks } from '#/parameters/getRemoteIssueLinks';
import { type CreateOrUpdateRemoteIssueLink } from '#/parameters/createOrUpdateRemoteIssueLink';
import { type DeleteRemoteIssueLinkByGlobalId } from '#/parameters/deleteRemoteIssueLinkByGlobalId';
import { type GetRemoteIssueLinkById } from '#/parameters/getRemoteIssueLinkById';
import { type UpdateRemoteIssueLink } from '#/parameters/updateRemoteIssueLink';
import { type DeleteRemoteIssueLinkById } from '#/parameters/deleteRemoteIssueLinkById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that
 * global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL
 * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1` as
 * `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getRemoteIssueLinks(client: Client, parameters: GetRemoteIssueLinks): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'GET',
    searchParams: {
      globalId: parameters.globalId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates a remote issue link for an issue.
 *
 * If a `globalId` is provided and a remote issue link with that global ID is found it is updated. Any fields without
 * values in the request are set to null. Otherwise, the remote issue link is created.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function createOrUpdateRemoteIssueLink(
  client: Client,
  parameters: CreateOrUpdateRemoteIssueLink,
): Promise<RemoteIssueLinkIdentifies> {
  const config: SendRequestOptions<RemoteIssueLinkIdentifies> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'POST',
    body: {
      application: parameters.application,
      globalId: parameters.globalId,
      object: parameters.object,
      relationship: parameters.relationship,
    },
    schema: RemoteIssueLinkIdentifiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL
 * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1` as
 * `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security permission
 *   to view the issue.
 */
export async function deleteRemoteIssueLinkByGlobalId(
  client: Client,
  parameters: DeleteRemoteIssueLinkByGlobalId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'DELETE',
    searchParams: {
      globalId: parameters.globalId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a remote issue link for an issue.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getRemoteIssueLinkById(
  client: Client,
  parameters: GetRemoteIssueLinkById,
): Promise<RemoteIssueLink> {
  const config: SendRequestOptions<RemoteIssueLink> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'GET',
    schema: RemoteIssueLinkSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a remote issue link for an issue.
 *
 * Note: Fields without values in the request are set to null.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function updateRemoteIssueLink(client: Client, parameters: UpdateRemoteIssueLink): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'PUT',
    body: {
      application: parameters.application,
      globalId: parameters.globalId,
      object: parameters.object,
      relationship: parameters.relationship,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a remote issue link from an issue.
 *
 * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_, _Edit issues_, and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg)
 *   for the project that the issue is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function deleteRemoteIssueLinkById(client: Client, parameters: DeleteRemoteIssueLinkById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
