import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueComments {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * comments specified by a list of comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Comments are returned where the user:
   *
   * - Has _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentsByIds<T = Models.PageComment>(
    parameters: Parameters.GetCommentsByIds | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * comments specified by a list of comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Comments are returned where the user:
   *
   * - Has _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentsByIds<T = Models.PageComment>(
    parameters?: Parameters.GetCommentsByIds,
    callback?: never
  ): Promise<T>;
  async getCommentsByIds<T = Models.PageComment>(
    parameters?: Parameters.GetCommentsByIds,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/comment/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Comments are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is
   *   restricted to.
   */
  async getComments<T = Models.PageOfComments>(
    parameters: Parameters.GetComments,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Comments are included in the response where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is
   *   restricted to.
   */
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback?: never): Promise<T>;
  async getComments<T = Models.PageOfComments>(
    parameters: Parameters.GetComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Add comments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback: Callback<T>): Promise<void>;
  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Add comments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *   project that the issue containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback?: never): Promise<T>;
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        self: parameters.self,
        id: parameters.id,
        author: parameters.author,
        body: parameters.body,
        renderedBody: parameters.renderedBody,
        updateAuthor: parameters.updateAuthor,
        created: parameters.created,
        updated: parameters.updated,
        visibility: parameters.visibility,
        jsdPublic: parameters.jsdPublic,
        jsdAuthorCanSeeRequest: parameters.jsdAuthorCanSeeRequest,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback: Callback<T>): Promise<void>;
  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: never): Promise<T>;
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *   containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or _Edit
   *   own comments_ to update comment created by the user.
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback: Callback<T>): Promise<void>;
  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *   containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or _Edit
   *   own comments_ to update comment created by the user.
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback?: never): Promise<T>;
  async updateComment<T = Models.Comment>(
    parameters: Parameters.UpdateComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        expand: parameters.expand,
      },
      data: {
        body: parameters.body,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *   containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Delete all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or
   *   _Delete own comments_ to delete comment created by the user,
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
   *   containing the comment is in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Delete all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or
   *   _Delete own comments_ to delete comment created by the user,
   * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.
   */
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback?: never): Promise<T>;
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
