import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueCustomFieldOptions {
  constructor(private client: Client) {}

  /**
   * Returns a custom field option. For example, an option in a select list.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect apps.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * custom field option is returned as follows:
   *
   * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for at least
   *   one project the custom field is used in, and the field is visible in at least one layout the user has permission
   *   to view.
   */
  async getCustomFieldOption<T = Models.CustomFieldOption>(
    parameters: Parameters.GetCustomFieldOption | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a custom field option. For example, an option in a select list.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect apps.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * custom field option is returned as follows:
   *
   * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for at least
   *   one project the custom field is used in, and the field is visible in at least one layout the user has permission
   *   to view.
   */
  async getCustomFieldOption<T = Models.CustomFieldOption>(
    parameters: Parameters.GetCustomFieldOption | string,
    callback?: never,
  ): Promise<T>;
  async getCustomFieldOption<T = Models.CustomFieldOption>(
    parameters: Parameters.GetCustomFieldOption | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/customFieldOption/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * custom field option for a context. Options are returned first then cascading options, in the order they display in
   * Jira.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). _Edit Workflow_ [edit workflow
   * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)
   */
  async getOptionsForContext<T = Models.PageCustomFieldContextOption>(
    parameters: Parameters.GetOptionsForContext,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * custom field option for a context. Options are returned first then cascading options, in the order they display in
   * Jira.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). _Edit Workflow_ [edit workflow
   * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)
   */
  async getOptionsForContext<T = Models.PageCustomFieldContextOption>(
    parameters: Parameters.GetOptionsForContext,
    callback?: never,
  ): Promise<T>;
  async getOptionsForContext<T = Models.PageCustomFieldContextOption>(
    parameters: Parameters.GetOptionsForContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'GET',
      params: {
        optionId: parameters.optionId,
        onlyOptions: parameters.onlyOptions,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a
   * custom select field. The options are added to a context of the field.
   *
   * The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000
   * options.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(
    parameters: Parameters.CreateCustomFieldOption,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a
   * custom select field. The options are added to a context of the field.
   *
   * The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000
   * options.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(
    parameters: Parameters.CreateCustomFieldOption,
    callback?: never,
  ): Promise<T>;
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(
    parameters: Parameters.CreateCustomFieldOption,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'POST',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the options of a custom field.
   *
   * If any of the options are not found, no options are updated. Options where the values in the request match the
   * current values aren't updated and aren't reported in the response.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(
    parameters: Parameters.UpdateCustomFieldOption,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the options of a custom field.
   *
   * If any of the options are not found, no options are updated. Options where the values in the request match the
   * current values aren't updated and aren't reported in the response.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(
    parameters: Parameters.UpdateCustomFieldOption,
    callback?: never,
  ): Promise<T>;
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(
    parameters: Parameters.UpdateCustomFieldOption,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'PUT',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Changes the order of custom field options or cascading options in a context.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async reorderCustomFieldOptions<T = void>(
    parameters: Parameters.ReorderCustomFieldOptions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Changes the order of custom field options or cascading options in a context.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async reorderCustomFieldOptions<T = void>(
    parameters: Parameters.ReorderCustomFieldOptions,
    callback?: never,
  ): Promise<T>;
  async reorderCustomFieldOptions<T = void>(
    parameters: Parameters.ReorderCustomFieldOptions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
      method: 'PUT',
      data: {
        after: parameters.after,
        customFieldOptionIds: parameters.customFieldOptionIds,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a custom field option.
   *
   * Options with cascading options cannot be deleted without deleting the cascading options first.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomFieldOption<T = void>(
    parameters: Parameters.DeleteCustomFieldOption,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a custom field option.
   *
   * Options with cascading options cannot be deleted without deleting the cascading options first.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with
   * issue field select list options created for Connect apps use the [Issue custom field options
   * (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback?: never): Promise<T>;
  async deleteCustomFieldOption<T = void>(
    parameters: Parameters.DeleteCustomFieldOption,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Replaces the options of a custom field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect or Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async replaceCustomFieldOption<T = unknown>(
    parameters: Parameters.ReplaceCustomFieldOption,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Replaces the options of a custom field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from
   * the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue
   * field select list options created by Connect or Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async replaceCustomFieldOption<T = unknown>(
    parameters: Parameters.ReplaceCustomFieldOption,
    callback?: never,
  ): Promise<T>;
  async replaceCustomFieldOption<T = unknown>(
    parameters: Parameters.ReplaceCustomFieldOption,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}/issue`,
      method: 'DELETE',
      params: {
        replaceWith: parameters.replaceWith,
        jql: parameters.jql,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
