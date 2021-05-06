import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueComments {
  constructor(private client: Client) {
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of just the comments for a list of comments specified by comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Comments are returned where the user:
   *
   *  *  has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentsByIds<T = Models.PageBeanComment>(parameters: Parameters.GetCommentsByIds | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of just the comments for a list of comments specified by comment IDs.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Comments are returned where the user:
   *
   *  *  has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentsByIds<T = Models.PageBeanComment>(parameters?: Parameters.GetCommentsByIds, callback?: never): Promise<T>;
  async getCommentsByIds<T = Models.PageBeanComment>(parameters?: Parameters.GetCommentsByIds, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/comment/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getCommentsByIds' });
  }

  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Comments are included in the response where the user has:
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to. */
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback: Callback<T>): Promise<void>;
  /**
   * Returns all comments for an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Comments are included in the response where the user has:
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to. */
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback?: never): Promise<T>;
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getComments' });
  }

  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* and *Add comments* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback: Callback<T>): Promise<void>;
  /**
   * Adds a comment to an issue.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* and *Add comments* [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue. */
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback?: never): Promise<T>;
  async addComment<T = Models.Comment>(parameters: Parameters.AddComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
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
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.addComment' });
  }

  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback: Callback<T>): Promise<void>;
  /**
   * Returns a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the comment.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: never): Promise<T>;
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.getComment' });
  }

  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Edit all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback: Callback<T>): Promise<void>;
  /**
   * Updates a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Edit all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback?: never): Promise<T>;
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.updateComment' });
  }

  /**
   * Deletes a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.
   *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
   *  *  *Delete all comments*[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,
   *  *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to. */
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback?: never): Promise<T>;
  async deleteComment<T = void>(parameters: Parameters.DeleteComment, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueComments.deleteComment' });
  }
}
