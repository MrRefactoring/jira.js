import { IssueLinkSchema, type IssueLink } from '#/models/issueLink';
import { type LinkIssues } from '#/parameters/linkIssues';
import { type GetIssueLink } from '#/parameters/getIssueLink';
import { type DeleteIssueLink } from '#/parameters/deleteIssueLink';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally
 * add a comment to the from (outward) issue. To use this resource the site must have [Issue
 * Linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use
 * `https://your-domain.atlassian.net/rest/api/3/issue/[linked issue key]?fields=issuelinks`.
 *
 * If the link request duplicates a link, the response indicates that the issue link was created. If the request
 * included a comment, the comment is added.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse project_ [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the
 *   issues to be linked,
 * - _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) on the project containing the from
 *   (outward) issue,
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function linkIssues(client: Client, parameters: LinkIssues): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/issueLink',
    method: 'POST',
    body: {
      comment: parameters.comment,
      inwardIssue: parameters.inwardIssue,
      outwardIssue: parameters.outwardIssue,
      type: parameters.type,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue link.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse project_ [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the
 *   linked issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the
 *   issues.
 */
export async function getIssueLink(client: Client, parameters: GetIssueLink): Promise<IssueLink> {
  const config: SendRequestOptions<IssueLink> = {
    url: `/rest/api/3/issueLink/${parameters.linkId}`,
    method: 'GET',
    schema: IssueLinkSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue link.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Browse project [project permission](https://confluence.atlassian.com/x/yodKLg) for all the projects containing the
 *   issues in the link.
 * - _Link issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one of the projects
 *   containing issues in the link.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the
 *   issues.
 */
export async function deleteIssueLink(client: Client, parameters: DeleteIssueLink): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issueLink/${parameters.linkId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
