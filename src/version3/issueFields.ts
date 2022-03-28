import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueFields {
  constructor(private client: Client) {}

  /**
   * Returns system and custom issue fields according to the following rules:
   *
   * - Fields that cannot be added to the issue navigator are always returned.
   * - Fields that cannot be placed on an issue screen are always returned.
   * - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking
   *   fields, subtasks, votes, and watches.
   * - For all other fields, this operation only returns the fields that the user has permission to view (that is, the
   *   field is used in at least one project that the user has _Browse Projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.)
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getFields<T = Models.FieldDetails[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns system and custom issue fields according to the following rules:
   *
   * - Fields that cannot be added to the issue navigator are always returned.
   * - Fields that cannot be placed on an issue screen are always returned.
   * - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking
   *   fields, subtasks, votes, and watches.
   * - For all other fields, this operation only returns the fields that the user has permission to view (that is, the
   *   field is used in at least one project that the user has _Browse Projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.)
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getFields<T = Models.FieldDetails[]>(callback?: never): Promise<T>;
  async getFields<T = Models.FieldDetails[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/field',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomField<T = Models.FieldDetails>(
    parameters: Parameters.CreateCustomField | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomField<T = Models.FieldDetails>(
    parameters?: Parameters.CreateCustomField,
    callback?: never
  ): Promise<T>;
  async createCustomField<T = Models.FieldDetails>(
    parameters?: Parameters.CreateCustomField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/field',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        type: parameters?.type,
        searcherKey: parameters?.searcherKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of fields
   * for Classic Jira projects. The list can include:
   *
   * - All fields.
   * - Specific fields, by defining `id`.
   * - Fields that contain a string in the field name or description, by defining `query`.
   * - Specific fields that contain a string in the field name or description, by defining `id` and `query`.
   *
   * Only custom fields can be queried, `type` must be set to `custom`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldsPaginated<T = Models.PageField>(
    parameters: Parameters.GetFieldsPaginated | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of fields
   * for Classic Jira projects. The list can include:
   *
   * - All fields.
   * - Specific fields, by defining `id`.
   * - Fields that contain a string in the field name or description, by defining `query`.
   * - Specific fields that contain a string in the field name or description, by defining `id` and `query`.
   *
   * Only custom fields can be queried, `type` must be set to `custom`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldsPaginated<T = Models.PageField>(
    parameters?: Parameters.GetFieldsPaginated,
    callback?: never
  ): Promise<T>;
  async getFieldsPaginated<T = Models.PageField>(
    parameters?: Parameters.GetFieldsPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
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
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback: Callback<T>): Promise<void>;
  /**
   * Updates a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomField<T = void>(parameters: Parameters.UpdateCustomField, callback?: never): Promise<T>;
  async updateCustomField<T = void>(
    parameters: Parameters.UpdateCustomField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        searcherKey: parameters.searcherKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination)
   *   list of the contexts a field is used in. Deprecated, use [ Get custom field
   *   contexts](#api-rest-api-3-field-fieldId-context-get).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getContextsForFieldDeprecated<T = Models.PageContext>(
    parameters: Parameters.GetContextsForFieldDeprecated,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination)
   *   list of the contexts a field is used in. Deprecated, use [ Get custom field
   *   contexts](#api-rest-api-3-field-fieldId-context-get).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getContextsForFieldDeprecated<T = Models.PageContext>(
    parameters: Parameters.GetContextsForFieldDeprecated,
    callback?: never
  ): Promise<T>;
  async getContextsForFieldDeprecated<T = Models.PageContext>(
    parameters: Parameters.GetContextsForFieldDeprecated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/contexts`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a custom field. The custom field is deleted whether it is in the trash or not. See [Edit or delete a custom
   * field](https://confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.
   *
   * This operation is [asynchronous](#async). Follow the `location` link in the response to determine the status of the
   * task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomField<T = unknown>(parameters: Parameters.DeleteCustomField, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a custom field. The custom field is deleted whether it is in the trash or not. See [Edit or delete a custom
   * field](https://confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.
   *
   * This operation is [asynchronous](#async). Follow the `location` link in the response to determine the status of the
   * task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomField<T = unknown>(parameters: Parameters.DeleteCustomField, callback?: never): Promise<T>;
  async deleteCustomField<T = unknown>(
    parameters: Parameters.DeleteCustomField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Restores a custom field from trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw)
   * for more information on trashing and deleting custom fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async restoreCustomField<T = unknown>(
    parameters: Parameters.RestoreCustomField,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Restores a custom field from trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw)
   * for more information on trashing and deleting custom fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async restoreCustomField<T = unknown>(parameters: Parameters.RestoreCustomField, callback?: never): Promise<T>;
  async restoreCustomField<T = unknown>(
    parameters: Parameters.RestoreCustomField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.id}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Moves a custom field to trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw) for
   * more information on trashing and deleting custom fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashCustomField<T = unknown>(parameters: Parameters.TrashCustomField, callback: Callback<T>): Promise<void>;
  /**
   * Moves a custom field to trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw) for
   * more information on trashing and deleting custom fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashCustomField<T = unknown>(parameters: Parameters.TrashCustomField, callback?: never): Promise<T>;
  async trashCustomField<T = unknown>(
    parameters: Parameters.TrashCustomField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.id}/trash`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }
}
