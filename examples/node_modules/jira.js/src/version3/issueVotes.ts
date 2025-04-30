import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueVotes {
  constructor(private client: Client) {}

  /**
   * Returns details about the votes on an issue.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   ini
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * Note that users with the necessary permissions for this operation but without the _View voters and watchers_
   * project permissions are not returned details in the `voters` field.
   */
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback: Callback<T>): Promise<void>;
  /**
   * Returns details about the votes on an issue.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   ini
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   *
   * Note that users with the necessary permissions for this operation but without the _View voters and watchers_
   * project permissions are not returned details in the `voters` field.
   */
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback?: never): Promise<T>;
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds the user's vote to an issue. This is the equivalent of the user clicking _Vote_ on an issue in Jira.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addVote<T = void>(parameters: Parameters.AddVote, callback: Callback<T>): Promise<void>;
  /**
   * Adds the user's vote to an issue. This is the equivalent of the user clicking _Vote_ on an issue in Jira.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addVote<T = void>(parameters: Parameters.AddVote, callback?: never): Promise<T>;
  async addVote<T = void>(parameters: Parameters.AddVote, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a user's vote from an issue. This is the equivalent of the user clicking _Unvote_ on an issue in Jira.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a user's vote from an issue. This is the equivalent of the user clicking _Unvote_ on an issue in Jira.
   *
   * This operation requires the **Allow users to vote on issues** option to be _ON_. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for
   * details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback?: never): Promise<T>;
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
