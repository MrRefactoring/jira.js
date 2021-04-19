import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueFields {
  constructor(private client: Client) { }
  /**
     * Returns system and custom issue fields according to the following rules:
     *
     *  *  Fields that cannot be added to the issue navigator are always returned.
     *  *  Fields that cannot be placed on an issue screen are always returned.
     *  *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.
     *  *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.)
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getFields<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
     * Returns system and custom issue fields according to the following rules:
     *
     *  *  Fields that cannot be added to the issue navigator are always returned.
     *  *  Fields that cannot be placed on an issue screen are always returned.
     *  *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.
     *  *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.)
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None. */
  async getFields<T = unknown>(callback?: never): Promise<T>;
  async getFields<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/field',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getFields' });
  }
  /**
     * Creates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomField<T = Models.FieldDetails>(parameters: Parameters.CreateCustomField | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Creates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomField<T = Models.FieldDetails>(parameters?: Parameters.CreateCustomField, callback?: never): Promise<T>;
  async createCustomField<T = Models.FieldDetails>(parameters?: Parameters.CreateCustomField, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/field',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        type: parameters?.type,
        searcherKey: parameters?.searcherKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createCustomField' });
  }
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of fields for Classic Jira projects. The list can include:
     *
     *  *  all fields.
     *  *  specific fields, by defining `id`.
     *  *  fields that contain a string in the field name or description, by defining `query`.
     *  *  specific fields that contain a string in the field name or description, by defining `id` and `query`.
     *
     * Only custom fields can be queried, `type` must be set to `custom`.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldsPaginated<T = Models.PageBeanField>(parameters: Parameters.GetFieldsPaginated | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of fields for Classic Jira projects. The list can include:
     *
     *  *  all fields.
     *  *  specific fields, by defining `id`.
     *  *  fields that contain a string in the field name or description, by defining `query`.
     *  *  specific fields that contain a string in the field name or description, by defining `id` and `query`.
     *
     * Only custom fields can be queried, `type` must be set to `custom`.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: never): Promise<T>;
  async getFieldsPaginated<T = Models.PageBeanField>(parameters?: Parameters.GetFieldsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/field/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        type: parameters?.type,
        id: parameters?.id,
        query: parameters?.query,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getFieldsPaginated' });
  }
  /**
     * Updates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback: Callback<T>): Promise<void>;
  /**
     * Updates a custom field.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback?: never): Promise<T>;
  async updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/field/${parameters.fieldId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        searcherKey: parameters.searcherKey,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateCustomField' });
  }
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the contexts a field is used in. Deprecated, use [ Get custom field contexts](#api-rest-api-3-field-fieldId-context-get).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the contexts a field is used in. Deprecated, use [ Get custom field contexts](#api-rest-api-3-field-fieldId-context-get).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback?: never): Promise<T>;
  async getContextsForFieldDeprecated<T = Models.PageBeanContext>(parameters: Parameters.GetContextsForFieldDeprecated, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/3/field/${parameters.fieldId}/contexts`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getContextsForFieldDeprecated' });
  }
}
