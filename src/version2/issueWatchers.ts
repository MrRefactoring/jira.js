import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWatchers {
  constructor(private client: Client) {}

  /**
   * Returns the watchers for an issue.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is ini
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To see details of users on the watchlist other than themselves, *View voters and watchers* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async getIssueWatchers<T = Models.Watchers>(
    parameters: Parameters.GetIssueWatchers,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the watchers for an issue.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is ini
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To see details of users on the watchlist other than themselves, *View voters and watchers* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async getIssueWatchers<T = Models.Watchers>(parameters: Parameters.GetIssueWatchers, callback?: never): Promise<T>;
  async getIssueWatchers<T = Models.Watchers>(
    parameters: Parameters.GetIssueWatchers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueWatchers.getIssueWatchers' });
  }

  /**
   * Adds a user as a watcher of an issue by passing the account ID of the user. For example,
   * `"5b10ac8d82e05b22cc7d4ef5"`. If no user is specified the calling user is added.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To add users other than themselves to the watchlist, *Manage watcher list* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user as a watcher of an issue by passing the account ID of the user. For example,
   * `"5b10ac8d82e05b22cc7d4ef5"`. If no user is specified the calling user is added.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To add users other than themselves to the watchlist, *Manage watcher list* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback?: never): Promise<T>;
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueWatchers.addWatcher' });
  }

  /**
   * Deletes a user as a watcher of an issue.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To remove users other than themselves from the watchlist, *Manage watcher list* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a user as a watcher of an issue.
   *
   * This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General
   * configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - To remove users other than themselves from the watchlist, *Manage watcher list* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   */
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback?: never): Promise<T>;
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'DELETE',
      params: {
        username: parameters.username,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueWatchers.removeWatcher' });
  }
}
