import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCommentProperties {
  constructor(private client: Client) { }
  /**
     * Returns the keys of all the properties of a comment.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback: Callback<T>): Promise<void>;
  /**
     * Returns the keys of all the properties of a comment.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback?: undefined): Promise<T>;
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getCommentPropertyKeys' });
  }
  /**
     * Returns the value of a comment property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback: Callback<T>): Promise<void>;
  /**
     * Returns the value of a comment property.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:**
     *
     *  *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     *  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     *  *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to. */
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback?: undefined): Promise<T>;
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getCommentProperty' });
  }
  /**
     * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
     *
     * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on any comment.
     *  *  *Edit Own Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or group. */
  async setCommentProperty<T = unknown>(parameters: Parameters.SetCommentProperty, callback: Callback<T>): Promise<void>;
  /**
     * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
     *
     * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on any comment.
     *  *  *Edit Own Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of a property on a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or group. */
  async setCommentProperty<T = unknown>(parameters: Parameters.SetCommentProperty, callback?: undefined): Promise<T>;
  async setCommentProperty<T = unknown>(parameters: Parameters.SetCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'setCommentProperty' });
  }
  /**
     * Deletes a comment property.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any comment.
     *  *  *Edit Own Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or group. */
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a comment property.
     *
     * **[Permissions](#permissions) required:** either of:
     *
     *  *  *Edit All Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any comment.
     *  *  *Edit Own Comments* [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a comment created by the user.
     *
     * Also, when the visibility of a comment is restricted to a role or group the user must be a member of that role or group. */
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback?: undefined): Promise<T>;
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteCommentProperty' });
  }
}
