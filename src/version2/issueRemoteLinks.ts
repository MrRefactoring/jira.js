import type { Client } from '../client';
import type { Request } from '../request';
import type { DeleteRemoteIssueLinkByGlobalIdParameters } from './parameters/deleteRemoteIssueLinkByGlobalIdParameters';
import type { GetRemoteIssueLinksParameters } from './parameters/getRemoteIssueLinksParameters';
import type { CreateOrUpdateRemoteIssueLinkParameters } from './parameters/createOrUpdateRemoteIssueLinkParameters';
import type { DeleteRemoteIssueLinkByIdParameters } from './parameters/deleteRemoteIssueLinkByIdParameters';
import type { GetRemoteIssueLinkByIdParameters } from './parameters/getRemoteIssueLinkByIdParameters';
import type { UpdateRemoteIssueLinkParameters } from './parameters/updateRemoteIssueLinkParameters';

export class IssueRemoteLinks {
  constructor(private client: Client) {}
  /**
   * Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`. *
   *
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *       that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security
   *       permission to view the issue.
   */
  async deleteRemoteIssueLinkByGlobalId(parameters: DeleteRemoteIssueLinkByGlobalIdParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'DELETE',
      query: {
        globalId: parameters.globalId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that
   * global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL
   * characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1`
   * as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`. *
   *
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async getRemoteIssueLinks(parameters: GetRemoteIssueLinksParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'GET',
      query: {
        globalId: parameters.globalId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates or updates a remote issue link for an issue. *
   *
   * - If a `globalId` is provided and a remote issue link with that global ID is found it is updated. Any fields without
   *   values in the request are set to null. Otherwise, the remote issue link is created.
   * -
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *       that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async createOrUpdateRemoteIssueLink(parameters: CreateOrUpdateRemoteIssueLinkParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'POST',
      body: {
        application: parameters.application,
        globalId: parameters.globalId,
        object: parameters.object,
        relationship: parameters.relationship,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a remote issue link from an issue. *
   *
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_, _Edit issues_, and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *       for the project that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async deleteRemoteIssueLinkById(parameters: DeleteRemoteIssueLinkByIdParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a remote issue link for an issue. *
   *
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async getRemoteIssueLinkById(parameters: GetRemoteIssueLinkByIdParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a remote issue link for an issue. *
   *
   * - Note: Fields without values in the request are set to null.
   * -
   * - This operation requires [issue linking to be active](https://confluence.atlassian.com/x/yoXKM).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project
   *       that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async updateRemoteIssueLink(parameters: UpdateRemoteIssueLinkParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'PUT',
      body: {
        application: parameters.application,
        globalId: parameters.globalId,
        object: parameters.object,
        relationship: parameters.relationship,
      },
    };

    return this.client.sendRequest(request);
  }
}
