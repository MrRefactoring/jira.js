import { PageCommentSchema, type PageComment } from '#/models/pageComment';
import { PageOfCommentsSchema, type PageOfComments } from '#/models/pageOfComments';
import { CommentSchema, type Comment } from '#/models/comment';
import { type GetCommentsByIds } from '#/parameters/getCommentsByIds';
import { type GetComments } from '#/parameters/getComments';
import { type AddComment } from '#/parameters/addComment';
import { type GetComment } from '#/parameters/getComment';
import { type UpdateComment } from '#/parameters/updateComment';
import { type DeleteComment } from '#/parameters/deleteComment';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of comments
 * specified by a list of comment IDs.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Comments
 * are returned where the user:
 *
 * - Has _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   comment.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getCommentsByIds(client: Client, parameters: GetCommentsByIds): Promise<PageComment> {
  const config: SendRequestOptions<PageComment> = {
    url: '/rest/api/3/comment/list',
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      ids: parameters.ids,
    },
    schema: PageCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all comments for an issue.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Comments
 * are included in the response where the user has:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   comment.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is
 *   restricted to.
 */
export async function getComments(client: Client, parameters: GetComments): Promise<PageOfComments> {
  const config: SendRequestOptions<PageOfComments> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      orderBy: parameters.orderBy,
      expand: parameters.expand,
    },
    schema: PageOfCommentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds a comment to an issue.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ and _Add comments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the project
 *   that the issue containing the comment is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function addComment(client: Client, parameters: AddComment): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
    method: 'POST',
    searchParams: {
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
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a comment.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 *   comment.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
 *   to.
 */
export async function getComment(client: Client, parameters: GetComment): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a comment.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
 *   containing the comment is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - _Edit all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any comment or _Edit
 *   own comments_ to update comment created by the user.
 * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
 *   to.
 *
 * **WARNING:** Child comments inherit visibility from their parent comment. Attempting to update a child comment's
 * visibility will result in a 400 (Bad Request) error.
 */
export async function updateComment(client: Client, parameters: UpdateComment): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'PUT',
    searchParams: {
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
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a comment.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue
 *   containing the comment is in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - _Delete all comments_[ project permission](https://confluence.atlassian.com/x/yodKLg) to delete any comment or
 *   _Delete own comments_ to delete comment created by the user,
 * - If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted
 *   to.
 */
export async function deleteComment(client: Client, parameters: DeleteComment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
