import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueCommentProperties {
  constructor(private client: Client) {}

  /**
   * Returns the keys of all the properties of a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetCommentPropertyKeys | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the keys of all the properties of a comment.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetCommentPropertyKeys | string,
    callback?: never
  ): Promise<T>;
  async getCommentPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetCommentPropertyKeys | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const commentId = typeof parameters === 'string' ? parameters : parameters.commentId;

    const config: RequestConfig = {
      url: `/rest/api/3/comment/${commentId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the value of a comment property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetCommentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the value of a comment property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getCommentProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetCommentProperty,
    callback?: never
  ): Promise<T>;
  async getCommentProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetCommentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** either
   * of:
   *
   * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *   of a property on any comment.
   * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *   of a property on a comment created by the user.
   *
   * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   * group.
   */
  async setCommentProperty<T = unknown>(
    parameters: Parameters.SetCommentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** either
   * of:
   *
   * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *   of a property on any comment.
   * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value
   *   of a property on a comment created by the user.
   *
   * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   * group.
   */
  async setCommentProperty<T = unknown>(parameters: Parameters.SetCommentProperty, callback?: never): Promise<T>;
  async setCommentProperty<T = unknown>(
    parameters: Parameters.SetCommentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
      data: parameters.property,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a comment property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** either
   * of:
   *
   * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any
   *   comment.
   * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a
   *   comment created by the user.
   *
   * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   * group.
   */
  async deleteCommentProperty<T = void>(
    parameters: Parameters.DeleteCommentProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a comment property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** either
   * of:
   *
   * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any
   *   comment.
   * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a
   *   comment created by the user.
   *
   * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or
   * group.
   */
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback?: never): Promise<T>;
  async deleteCommentProperty<T = void>(
    parameters: Parameters.DeleteCommentProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
