import type { Client } from '../client';
import type { Request } from '../request';
import type { LinkIssuesParameters } from './parameters/linkIssuesParameters';
import type { DeleteIssueLinkParameters } from './parameters/deleteIssueLinkParameters';
import type { GetIssueLinkParameters } from './parameters/getIssueLinkParameters';

export class IssueLinks {
  constructor(private client: Client) {}
  /**
   * Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally
   * add a comment to the from (outward) issue. To use this resource the site must have [Issue
   * Linking](https://confluence.atlassian.com/x/yoXKM) enabled. *
   *
   * - This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use
   *   `https://your-domain.atlassian.net/rest/api/2/issue/[linked issue key]?fields=issuelinks`.
   * -
   * - If the link request duplicates a link, the response indicates that the issue link was created. If the request
   *   included a comment, the comment is added.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse project_ [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing
   *       the issues to be linked,
   * - - _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) on the project containing the from
   *       (outward) issue,
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async linkIssues(parameters: LinkIssuesParameters) {
    const request: Request = {
      url: '/rest/api/2/issueLink',
      method: 'POST',
      body: {
        comment: parameters.comment,
        inwardIssue: parameters.inwardIssue,
        outwardIssue: parameters.outwardIssue,
        type: parameters.type,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue link. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - Browse project [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the
   *       issues in the link.
   * - - _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the projects
   *       containing issues in the link.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the
   *       issues.
   */
  async deleteIssueLink(parameters: DeleteIssueLinkParameters) {
    const request: Request = {
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue link. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse project_ [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing
   *       the linked issues.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the
   *       issues.
   */
  async getIssueLink(parameters: GetIssueLinkParameters) {
    const request: Request = {
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
