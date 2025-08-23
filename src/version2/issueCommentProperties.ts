import type { Client } from '../client';
import type { Request } from '../request';
import type { GetCommentPropertyKeysParameters } from './parameters/getCommentPropertyKeysParameters';
import type { DeleteCommentPropertyParameters } from './parameters/deleteCommentPropertyParameters';
import type { GetCommentPropertyParameters } from './parameters/getCommentPropertyParameters';
import type { SetCommentPropertyParameters } from './parameters/setCommentPropertyParameters';

export class IssueCommentProperties {
  constructor(private client: Client) {}
  /**
   * Returns the keys of all the properties of a comment. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentPropertyKeys(parameters: GetCommentPropertyKeysParameters) {
    const request: Request = {
      url: `/rest/api/2/comment/${parameters.commentId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a comment property. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either
   *   of:
   * -
   * - - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any
   *       comment.
   * - - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a
   *       comment created by the user.
   * -
   * - Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   *   group.
   */
  async deleteCommentProperty(parameters: DeleteCommentPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the value of a comment property. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentProperty(parameters: GetCommentPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
   * *
   *
   * - The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   *   maximum length is 32768 characters.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** either
   *   of:
   * -
   * - - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *       of a property on any comment.
   * - - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *       of a property on a comment created by the user.
   * -
   * - Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   *   group.
   */
  async setCommentProperty(parameters: SetCommentPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }
}
