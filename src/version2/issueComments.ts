import type { Client } from '../client';
import type { Request } from '../request';
import type { GetCommentsByIdsParameters } from './parameters/getCommentsByIdsParameters';
import type { GetCommentsParameters } from './parameters/getCommentsParameters';
import type { AddCommentParameters } from './parameters/addCommentParameters';
import type { DeleteCommentParameters } from './parameters/deleteCommentParameters';
import type { GetCommentParameters } from './parameters/getCommentParameters';
import type { UpdateCommentParameters } from './parameters/updateCommentParameters';

export class IssueComments {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * comments specified by a list of comment IDs. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Comments are returned where the user:
   * -
   * - - Has _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   *       the comment.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentsByIds(parameters: GetCommentsByIdsParameters) {
    const request: Request = {
      url: '/rest/api/2/comment/list',
      method: 'POST',
      query: {
        expand: parameters.expand,
      },
      body: {
        ids: parameters.ids,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all comments for an issue. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Comments are included in the response where the user has:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       comment.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is
   *       restricted to.
   */
  async getComments(parameters: GetCommentsParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a comment to an issue. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ and _Add comments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project that the issue containing the comment is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async addComment(parameters: AddCommentParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'POST',
      query: {
        expand: parameters.expand,
      },
      body: {
        author: parameters.author,
        body: parameters.body,
        created: parameters.created,
        id: parameters.id,
        jsdAuthorCanSeeRequest: parameters.jsdAuthorCanSeeRequest,
        jsdPublic: parameters.jsdPublic,
        properties: parameters.properties,
        renderedBody: parameters.renderedBody,
        self: parameters.self,
        updateAuthor: parameters.updateAuthor,
        updated: parameters.updated,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a comment. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *       containing the comment is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Delete all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or
   *       _Delete own comments_ to delete comment created by the user,
   * - - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
   *       to.
   */
  async deleteComment(parameters: DeleteCommentParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a comment. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *       comment.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
   *       to.
   */
  async getComment(parameters: GetCommentParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a comment. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *       containing the comment is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - _Edit all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or _Edit
   *       own comments_ to update comment created by the user.
   * - - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
   *       to.
   * -
   * - **WARNING:** Child comments inherit visibility from their parent comment. Attempting to update a child comment's
   *   visibility will result in a 400 (Bad Request) error.
   */
  async updateComment(parameters: UpdateCommentParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'PUT',
      query: {
        notifyUsers: parameters.notifyUsers,
        overrideEditableFlag: parameters.overrideEditableFlag,
        expand: parameters.expand,
      },
      body: {
        author: parameters.author,
        body: parameters.body,
        created: parameters.created,
        id: parameters.id,
        jsdAuthorCanSeeRequest: parameters.jsdAuthorCanSeeRequest,
        jsdPublic: parameters.jsdPublic,
        properties: parameters.properties,
        renderedBody: parameters.renderedBody,
        self: parameters.self,
        updateAuthor: parameters.updateAuthor,
        updated: parameters.updated,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(request);
  }
}
