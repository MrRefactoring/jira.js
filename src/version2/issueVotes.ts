import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveVoteParameters } from './parameters/removeVoteParameters';
import type { GetVotesParameters } from './parameters/getVotesParameters';
import type { AddVoteParameters } from './parameters/addVoteParameters';

export class IssueVotes {
  constructor(private client: Client) {}
  /**
   * Deletes a user's vote from an issue. This is the equivalent of the user clicking _Unvote_ on an issue in Jira. *
   *
   * - This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   *   configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   *   details.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async removeVote(parameters: RemoveVoteParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns details about the votes on an issue. *
   *
   * - This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   *   configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   *   details.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       ini
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * -
   * - Note that users with the necessary permissions for this operation but without the _View voters and watchers_
   *   project permissions are not returned details in the `voters` field.
   */
  async getVotes(parameters: GetVotesParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds the user's vote to an issue. This is the equivalent of the user clicking _Vote_ on an issue in Jira. *
   *
   * - This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   *   configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   *   details.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async addVote(parameters: AddVoteParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }
}
