import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueRemoteLinks {
  constructor(private client: Client) {}

  /**
   * Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that
   * global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinks,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that
   * global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinks,
    callback?: never
  ): Promise<T>;
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'GET',
      params: {
        globalId: parameters.globalId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueRemoteLinks.getRemoteIssueLinks' });
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(
    parameters: Parameters.CreateOrUpdateRemoteIssueLink,
    callback: Callback<T>
  ): Promise<void>;
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(
    parameters: Parameters.CreateOrUpdateRemoteIssueLink,
    callback?: never
  ): Promise<T>;
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(
    parameters: Parameters.CreateOrUpdateRemoteIssueLink,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'POST',
      data: {
        globalId: parameters.globalId,
        application: parameters.application,
        relationship: parameters.relationship,
        object: parameters.object,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueRemoteLinks.createOrUpdateRemoteIssueLink',
    });
  }

  /**
   * Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security
   *   permission to view the issue.
   */
  async deleteRemoteIssueLinkByGlobalId<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkByGlobalId,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security
   *   permission to view the issue.
   */
  async deleteRemoteIssueLinkByGlobalId<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkByGlobalId,
    callback?: never
  ): Promise<T>;
  async deleteRemoteIssueLinkByGlobalId<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkByGlobalId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'DELETE',
      params: {
        globalId: parameters.globalId,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueRemoteLinks.deleteRemoteIssueLinkByGlobalId',
    });
  }

  /**
   * Returns a remote issue link for an issue.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinkById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a remote issue link for an issue.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinkById,
    callback?: never
  ): Promise<T>;
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(
    parameters: Parameters.GetRemoteIssueLinkById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueRemoteLinks.getRemoteIssueLinkById',
    });
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async updateRemoteIssueLink<T = void>(
    parameters: Parameters.UpdateRemoteIssueLink,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a remote issue link for an issue.
   *
   * Note: Fields without values in the request are set to null.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects* and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *   that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async updateRemoteIssueLink<T = void>(parameters: Parameters.UpdateRemoteIssueLink, callback?: never): Promise<T>;
  async updateRemoteIssueLink<T = void>(
    parameters: Parameters.UpdateRemoteIssueLink,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'PUT',
      data: {
        globalId: parameters.globalId,
        application: parameters.application,
        relationship: parameters.relationship,
        object: parameters.object,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueRemoteLinks.updateRemoteIssueLink' });
  }

  /**
   * Deletes a remote issue link from an issue.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects*, *Edit issues*, and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteRemoteIssueLinkById<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a remote issue link from an issue.
   *
   * This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Browse projects*, *Edit issues*, and *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for the project that the issue is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteRemoteIssueLinkById<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkById,
    callback?: never
  ): Promise<T>;
  async deleteRemoteIssueLinkById<T = void>(
    parameters: Parameters.DeleteRemoteIssueLinkById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueRemoteLinks.deleteRemoteIssueLinkById',
    });
  }
}
