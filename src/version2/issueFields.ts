import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateCustomFieldParameters } from './parameters/createCustomFieldParameters';
import type { GetFieldsPaginatedParameters } from './parameters/getFieldsPaginatedParameters';
import type { GetTrashedFieldsPaginatedParameters } from './parameters/getTrashedFieldsPaginatedParameters';
import type { UpdateCustomFieldParameters } from './parameters/updateCustomFieldParameters';
import type { DeleteCustomFieldParameters } from './parameters/deleteCustomFieldParameters';
import type { RestoreCustomFieldParameters } from './parameters/restoreCustomFieldParameters';
import type { TrashCustomFieldParameters } from './parameters/trashCustomFieldParameters';

export class IssueFields {
  constructor(private client: Client) {}
  /**
   * Returns system and custom issue fields according to the following rules: *
   *
   * - - Fields that cannot be added to the issue navigator are always returned.
   * - - Fields that cannot be placed on an issue screen are always returned.
   * - - Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking
   *       fields, subtasks, votes, and watches.
   * - - For all other fields, this operation only returns the fields that the user has permission to view (that is, the
   *       field is used in at least one project that the user has _Browse Projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.)
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getFields() {
    const request: Request = {
      url: '/rest/api/2/field',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a custom field. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomField(parameters: CreateCustomFieldParameters) {
    const request: Request = {
      url: '/rest/api/2/field',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
        searcherKey: parameters.searcherKey,
        type: parameters.type,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of fields
   * for Classic Jira projects. The list can include: *
   *
   * - - All fields
   * - - Specific fields, by defining `id`
   * - - Fields that contain a string in the field name or description, by defining `query`
   * - - Specific fields that contain a string in the field name or description, by defining `id` and `query`
   * -
   * - Use `type` must be set to `custom` to show custom fields only.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getFieldsPaginated(parameters: GetFieldsPaginatedParameters) {
    const request: Request = {
      url: '/rest/api/2/field/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        type: parameters.type,
        id: parameters.id,
        query: parameters.query,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of fields
   * in the trash. The list may be restricted to fields whose field name or description partially match a string. *
   *
   * - Only custom fields can be queried, `type` must be set to `custom`.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getTrashedFieldsPaginated(parameters: GetTrashedFieldsPaginatedParameters) {
    const request: Request = {
      url: '/rest/api/2/field/search/trashed',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        query: parameters.query,
        expand: parameters.expand,
        orderBy: parameters.orderBy,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a custom field. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomField(parameters: UpdateCustomFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/field/${parameters.fieldId}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
        searcherKey: parameters.searcherKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a custom field. The custom field is deleted whether it is in the trash or not. See [Edit or delete a custom
   * field](https://confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields. *
   *
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomField(parameters: DeleteCustomFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/field/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Restores a custom field from trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw)
   * for more information on trashing and deleting custom fields. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async restoreCustomField(parameters: RestoreCustomFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/field/${parameters.id}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Moves a custom field to trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw) for
   * more information on trashing and deleting custom fields. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashCustomField(parameters: TrashCustomFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/field/${parameters.id}/trash`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }
}
