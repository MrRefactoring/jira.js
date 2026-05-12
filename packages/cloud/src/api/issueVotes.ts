import { VotesSchema, type Votes } from '#/models/votes';
import { type GetVotes } from '#/parameters/getVotes';
import { type AddVote } from '#/parameters/addVote';
import { type RemoveVote } from '#/parameters/removeVote';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns details about the votes on an issue.
 *
 * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
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
 *
 * Note that users with the necessary permissions for this operation but without the _View voters and watchers_ project
 * permissions are not returned details in the `voters` field.
 */
export async function getVotes(client: Client, parameters: GetVotes): Promise<Votes> {
  const config: SendRequestOptions<Votes> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
    method: 'GET',
    schema: VotesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds the user's vote to an issue. This is the equivalent of the user clicking _Vote_ on an issue in Jira.
 *
 * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function addVote(client: Client, parameters: AddVote): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a user's vote from an issue. This is the equivalent of the user clicking _Unvote_ on an issue in Jira.
 *
 * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
 * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
 * details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function removeVote(client: Client, parameters: RemoveVote): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
