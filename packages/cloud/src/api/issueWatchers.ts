import { BulkIssueIsWatchingSchema, type BulkIssueIsWatching } from '#/models/bulkIssueIsWatching';
import { WatchersSchema, type Watchers } from '#/models/watchers';
import { type GetIsWatchingIssueBulk } from '#/parameters/getIsWatchingIssueBulk';
import { type GetIssueWatchers } from '#/parameters/getIssueWatchers';
import { type AddWatcher } from '#/parameters/addWatcher';
import { type RemoveWatcher } from '#/parameters/removeWatcher';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns, for the user, details of the watched status of issues from a list. If an issue ID is invalid, the returned
 * watched status is `false`.
 *
 * This operation requires the **Allow users to watch issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getIsWatchingIssueBulk(
  client: Client,
  parameters: GetIsWatchingIssueBulk,
): Promise<BulkIssueIsWatching> {
  const config: SendRequestOptions<BulkIssueIsWatching> = {
    url: '/rest/api/3/issue/watching',
    method: 'POST',
    body: {
      issueIds: parameters.issueIds,
    },
    schema: BulkIssueIsWatchingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the watchers for an issue.
 *
 * This operation requires the **Allow users to watch issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   ini
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - To see details of users on the watchlist other than themselves, _View voters and watchers_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
 */
export async function getIssueWatchers(client: Client, parameters: GetIssueWatchers): Promise<Watchers> {
  const config: SendRequestOptions<Watchers> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'GET',
    schema: WatchersSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a user as a watcher of an issue by passing the account ID of the user. For example,
 * `"5b10ac8d82e05b22cc7d4ef5"`. If no user is specified the calling user is added.
 *
 * This operation requires the **Allow users to watch issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - To add users other than themselves to the watchlist, _Manage watcher list_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
 */
export async function addWatcher(client: Client, parameters: AddWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a user as a watcher of an issue.
 *
 * This operation requires the **Allow users to watch issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - To remove users other than themselves from the watchlist, _Manage watcher list_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
 */
export async function removeWatcher(client: Client, parameters: RemoveWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}
