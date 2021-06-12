import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeProperties {
  constructor(private client: Client) {}

  /**
   * Returns all the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * keys of the issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys of any issue type.
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys of any
   *   issue types associated with the projects the user has permission to browse.
   */
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssueTypePropertyKeys,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * keys of the issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys of any issue type.
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys of any
   *   issue types associated with the projects the user has permission to browse.
   */
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssueTypePropertyKeys,
    callback?: never
  ): Promise<T>;
  async getIssueTypePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssueTypePropertyKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueTypeProperties.getIssueTypePropertyKeys',
    });
  }

  /**
   * Returns the key and value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of any issue type.
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the details of any issue
   *   types associated with the projects the user has permission to browse.
   */
  async getIssueTypeProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueTypeProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the key and value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of any issue type.
   * - *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the details of any issue
   *   types associated with the projects the user has permission to browse.
   */
  async getIssueTypeProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueTypeProperty,
    callback?: never
  ): Promise<T>;
  async getIssueTypeProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueTypeProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueTypeProperties.getIssueTypeProperty',
    });
  }

  /**
   * Creates or updates the value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * Use this resource to store and update data against an issue type.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueTypeProperty<T = unknown>(
    parameters: Parameters.SetIssueTypeProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates or updates the value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * Use this resource to store and update data against an issue type.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueTypeProperty<T = unknown>(parameters: Parameters.SetIssueTypeProperty, callback?: never): Promise<T>;
  async setIssueTypeProperty<T = unknown>(
    parameters: Parameters.SetIssueTypeProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueTypeProperties.setIssueTypeProperty',
    });
  }

  /**
   * Deletes the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeProperty<T = void>(
    parameters: Parameters.DeleteIssueTypeProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeProperty<T = void>(parameters: Parameters.DeleteIssueTypeProperty, callback?: never): Promise<T>;
  async deleteIssueTypeProperty<T = void>(
    parameters: Parameters.DeleteIssueTypeProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueTypeProperties.deleteIssueTypeProperty',
    });
  }
}
