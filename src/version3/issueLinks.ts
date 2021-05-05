import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueLinks {
  constructor(private client: Client) {
  }

  /**
   * Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally add a comment to the from (outward) issue. To use this resource the site must have [Issue Linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use `https://your-domain.atlassian.net/rest/api/3/issue/[linked issue key]?fields=issuelinks`.
   *
   * If the link request duplicates a link, the response indicates that the issue link was created. If the request included a comment, the comment is added.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  *Browse project* [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the issues to be linked,
   *  *  *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) on the project containing the from (outward) issue,
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async linkIssues<T = void>(parameters: Parameters.LinkIssues | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally add a comment to the from (outward) issue. To use this resource the site must have [Issue Linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use `https://your-domain.atlassian.net/rest/api/3/issue/[linked issue key]?fields=issuelinks`.
   *
   * If the link request duplicates a link, the response indicates that the issue link was created. If the request included a comment, the comment is added.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  *Browse project* [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the issues to be linked,
   *  *  *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) on the project containing the from (outward) issue,
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async linkIssues<T = void>(parameters?: Parameters.LinkIssues, callback?: never): Promise<T>;
  async linkIssues<T = void>(parameters?: Parameters.LinkIssues, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issueLink',
      method: 'POST',
      data: {
        type: parameters?.type,
        inwardIssue: parameters?.inwardIssue,
        outwardIssue: parameters?.outwardIssue,
        comment: parameters?.comment,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinks.linkIssues' });
  }

  /**
   * Returns an issue link.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  *Browse project* [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the linked issues.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues. */
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback: Callback<T>): Promise<void>;
  /**
   * Returns an issue link.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  *Browse project* [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the linked issues.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues. */
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: never): Promise<T>;
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issueLink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinks.getIssueLink' });
  }

  /**
   * Deletes an issue link.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  Browse project [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the issues in the link.
   *  *  *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the projects containing issues in the link.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues. */
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue link.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   *  *  Browse project [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the issues in the link.
   *  *  *Link issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the projects containing issues in the link.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues. */
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback?: never): Promise<T>;
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issueLink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueLinks.deleteIssueLink' });
  }
}
