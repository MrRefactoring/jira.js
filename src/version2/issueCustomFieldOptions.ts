import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldOptions {
  constructor(private client: Client) {
  }

  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Get custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-get) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of options and, where the custom select field is of the type *Select List (cascading)*, cascading options for custom select fields. Cascading options are included in the item count when determining pagination. Only options from the global context are returned.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback: Callback<T>): Promise<void>;
  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Get custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-get) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of options and, where the custom select field is of the type *Select List (cascading)*, cascading options for custom select fields. Cascading options are included in the item count when determining pagination. Only options from the global context are returned.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback?: never): Promise<T>;
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.getOptionsForField' });
  }

  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Create custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-post) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Creates options and, where the custom select field is of the type *Select List (cascading)*, cascading options for a custom select field. The options are added to the global context of the field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldOptions<T = unknown>(parameters: Parameters.CreateCustomFieldOptions, callback: Callback<T>): Promise<void>;
  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Create custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-post) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Creates options and, where the custom select field is of the type *Select List (cascading)*, cascading options for a custom select field. The options are added to the global context of the field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldOptions<T = unknown>(parameters: Parameters.CreateCustomFieldOptions, callback?: never): Promise<T>;
  async createCustomFieldOptions<T = unknown>(parameters: Parameters.CreateCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'POST',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.createCustomFieldOptions' });
  }

  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Update custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-put) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Updates the options on a custom select field. Where an updated option is in use on an issue, the value on the issue is also updated. Options that are not found are ignored. A maximum of 1000 options, including sub-options of *Select List (cascading)* fields, can be updated per request. The options are updated on the global context of the field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback: Callback<T>): Promise<void>;
  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Update custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-put) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Updates the options on a custom select field. Where an updated option is in use on an issue, the value on the issue is also updated. Options that are not found are ignored. A maximum of 1000 options, including sub-options of *Select List (cascading)* fields, can be updated per request. The options are updated on the global context of the field.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback?: never): Promise<T>;
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'PUT',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.updateCustomFieldOptions' });
  }

  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Get custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-get) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Returns a custom field option. For example, an option in a select list.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The custom field option is returned as follows:
   *
   *  *  if the user has the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *  *  if the user has the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one project the custom field is used in, and the field is visible in at least one layout the user has permission to view. */
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback: Callback<T>): Promise<void>;
  /**
   * This operation is deprecated and becomes unavailable on 8 May 2021. Use [Get custom field options (context)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-rest-api-3-field-fieldid-context-contextid-option-get) instead. See [Deprecation of custom field options](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-removal-of-custom-field-options-operations/) for details.
   *
   * Returns a custom field option. For example, an option in a select list.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The custom field option is returned as follows:
   *
   *  *  if the user has the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *  *  if the user has the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one project the custom field is used in, and the field is visible in at least one layout the user has permission to view. */
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback?: never): Promise<T>;
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/customFieldOption/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.getCustomFieldOption' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback?: never): Promise<T>;
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'GET',
      params: {
        optionId: parameters.optionId,
        onlyOptions: parameters.onlyOptions,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.getOptionsForContext' });
  }

  /**
   * Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.
   *
   * The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000 options.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback: Callback<T>): Promise<void>;
  /**
   * Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.
   *
   * The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000 options.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback?: never): Promise<T>;
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'POST',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.createCustomFieldOption' });
  }

  /**
   * Updates the options of a custom field.
   *
   * If any of the options are not found, no options are updated. Options where the values in the request match the current values aren't updated and aren't reported in the response.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback: Callback<T>): Promise<void>;
  /**
   * Updates the options of a custom field.
   *
   * If any of the options are not found, no options are updated. Options where the values in the request match the current values aren't updated and aren't reported in the response.
   *
   * Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback?: never): Promise<T>;
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'PUT',
      data: {
        options: parameters.options,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.updateCustomFieldOption' });
  }

  /**
   * Changes the order of custom field options or cascading options in a context.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback: Callback<T>): Promise<void>;
  /**
   * Changes the order of custom field options or cascading options in a context.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback?: never): Promise<T>;
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
      method: 'PUT',
      data: {
        customFieldOptionIds: parameters.customFieldOptionIds,
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.reorderCustomFieldOptions' });
  }

  /**
   * Deletes a custom field option.
   *
   * Options with cascading options cannot be deleted without deleting the cascading options first.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a custom field option.
   *
   * Options with cascading options cannot be deleted without deleting the cascading options first.
   *
   * This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback?: never): Promise<T>;
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueCustomFieldOptions.deleteCustomFieldOption' });
  }
}
