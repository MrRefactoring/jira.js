import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldContexts {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of [
   * contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a
   * custom field. Contexts can be returned as follows:
   *
   * - With no other parameters set, all contexts.
   * - By defining `id` only, all contexts from the list of IDs.
   * - By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types
   *   (true) or those that apply to only a subset of issue types (false)
   * - By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global
   *   contexts) (true) or those that apply to only a subset of projects (false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getContextsForField<T = Models.PageCustomFieldContext>(
    parameters: Parameters.GetContextsForField | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of [
   * contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a
   * custom field. Contexts can be returned as follows:
   *
   * - With no other parameters set, all contexts.
   * - By defining `id` only, all contexts from the list of IDs.
   * - By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types
   *   (true) or those that apply to only a subset of issue types (false)
   * - By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global
   *   contexts) (true) or those that apply to only a subset of projects (false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getContextsForField<T = Models.PageCustomFieldContext>(
    parameters: Parameters.GetContextsForField | string,
    callback?: never
  ): Promise<T>;
  async getContextsForField<T = Models.PageCustomFieldContext>(
    parameters: Parameters.GetContextsForField | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/field/${fieldId}/context`,
      method: 'GET',
      params: {
        isAnyIssueType: typeof parameters !== 'string' && parameters.isAnyIssueType,
        isGlobalContext: typeof parameters !== 'string' && parameters.isGlobalContext,
        contextId: typeof parameters !== 'string' && parameters.contextId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a custom field context.
   *
   * If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If
   * `issueTypeIds` is empty, the context applies to all issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(
    parameters: Parameters.CreateCustomFieldContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a custom field context.
   *
   * If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If
   * `issueTypeIds` is empty, the context applies to all issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(
    parameters: Parameters.CreateCustomFieldContext,
    callback?: never
  ): Promise<T>;
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(
    parameters: Parameters.CreateCustomFieldContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context`,
      method: 'POST',
      data: {
        id: parameters.id,
        name: parameters.name,
        description: parameters.description,
        projectIds: parameters.projectIds,
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * defaults for a custom field. The results can be filtered by `contextId`, otherwise all values are returned. If no
   * defaults are set for a context, nothing is returned. The returned object depends on type of the custom field:
   *
   * - `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
   * - `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for date-time fields.
   * - `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for single choice select lists and radio
   *   buttons.
   * - `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for multiple choice select lists and
   *   checkboxes.
   * - `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`) for cascading select lists.
   * - `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`) for single users.
   * - `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`) for user lists.
   * - `CustomFieldContextDefaultValueSingleGroupPicker` (type `grouppicker.single`) for single choice group pickers.
   * - `CustomFieldContextDefaultValueMultipleGroupPicker` (type `grouppicker.multiple`) for multiple choice group
   *   pickers.
   * - `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
   * - `CustomFieldContextDefaultValueProject` (type `project`) for project pickers.
   * - `CustomFieldContextDefaultValueFloat` (type `float`) for floats (floating-point numbers).
   * - `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
   * - `CustomFieldContextDefaultValueTextField` (type `textfield`) for text fields.
   * - `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area fields.
   * - `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only (text) fields.
   * - `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`) for single choice version pickers.
   * - `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for multiple choice version pickers.
   *
   * Forge custom fields
   * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
   * are also supported, returning:
   *
   * - `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`) for Forge string fields.
   * - `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type `forge.string.list`) for Forge string collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`) for Forge object fields.
   * - `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type `forge.datetime`) for Forge date-time fields.
   * - `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`) for Forge group fields.
   * - `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type `forge.group.list`) for Forge group collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`) for Forge number fields.
   * - `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for Forge user fields.
   * - `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type `forge.user.list`) for Forge user collection fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultValues<T = Models.PageCustomFieldContextDefaultValue>(
    parameters: Parameters.GetDefaultValues | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * defaults for a custom field. The results can be filtered by `contextId`, otherwise all values are returned. If no
   * defaults are set for a context, nothing is returned. The returned object depends on type of the custom field:
   *
   * - `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
   * - `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for date-time fields.
   * - `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for single choice select lists and radio
   *   buttons.
   * - `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for multiple choice select lists and
   *   checkboxes.
   * - `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`) for cascading select lists.
   * - `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`) for single users.
   * - `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`) for user lists.
   * - `CustomFieldContextDefaultValueSingleGroupPicker` (type `grouppicker.single`) for single choice group pickers.
   * - `CustomFieldContextDefaultValueMultipleGroupPicker` (type `grouppicker.multiple`) for multiple choice group
   *   pickers.
   * - `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
   * - `CustomFieldContextDefaultValueProject` (type `project`) for project pickers.
   * - `CustomFieldContextDefaultValueFloat` (type `float`) for floats (floating-point numbers).
   * - `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
   * - `CustomFieldContextDefaultValueTextField` (type `textfield`) for text fields.
   * - `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area fields.
   * - `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only (text) fields.
   * - `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`) for single choice version pickers.
   * - `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for multiple choice version pickers.
   *
   * Forge custom fields
   * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
   * are also supported, returning:
   *
   * - `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`) for Forge string fields.
   * - `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type `forge.string.list`) for Forge string collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`) for Forge object fields.
   * - `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type `forge.datetime`) for Forge date-time fields.
   * - `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`) for Forge group fields.
   * - `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type `forge.group.list`) for Forge group collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`) for Forge number fields.
   * - `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for Forge user fields.
   * - `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type `forge.user.list`) for Forge user collection fields.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultValues<T = Models.PageCustomFieldContextDefaultValue>(
    parameters: Parameters.GetDefaultValues | string,
    callback?: never
  ): Promise<T>;
  async getDefaultValues<T = Models.PageCustomFieldContextDefaultValue>(
    parameters: Parameters.GetDefaultValues | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/field/${fieldId}/context/defaultValue`,
      method: 'GET',
      params: {
        contextId: typeof parameters !== 'string' && parameters.contextId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets default for contexts of a custom field. Default are defined using these objects:
   *
   * - `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
   * - `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for date-time fields.
   * - `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for single choice select lists and radio
   *   buttons.
   * - `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for multiple choice select lists and
   *   checkboxes.
   * - `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`) for cascading select lists.
   * - `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`) for single users.
   * - `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`) for user lists.
   * - `CustomFieldContextDefaultValueSingleGroupPicker` (type `grouppicker.single`) for single choice group pickers.
   * - `CustomFieldContextDefaultValueMultipleGroupPicker` (type `grouppicker.multiple`) for multiple choice group
   *   pickers.
   * - `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
   * - `CustomFieldContextDefaultValueProject` (type `project`) for project pickers.
   * - `CustomFieldContextDefaultValueFloat` (type `float`) for floats (floating-point numbers).
   * - `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
   * - `CustomFieldContextDefaultValueTextField` (type `textfield`) for text fields.
   * - `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area fields.
   * - `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only (text) fields.
   * - `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`) for single choice version pickers.
   * - `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for multiple choice version pickers.
   *
   * Forge custom fields
   * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
   * are also supported, returning:
   *
   * - `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`) for Forge string fields.
   * - `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type `forge.string.list`) for Forge string collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`) for Forge object fields.
   * - `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type `forge.datetime`) for Forge date-time fields.
   * - `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`) for Forge group fields.
   * - `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type `forge.group.list`) for Forge group collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`) for Forge number fields.
   * - `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for Forge user fields.
   * - `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type `forge.user.list`) for Forge user collection fields.
   *
   * Only one type of default object can be included in a request. To remove a default for a context, set the default
   * parameter to `null`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultValues<T = void>(parameters: Parameters.SetDefaultValues, callback: Callback<T>): Promise<void>;
  /**
   * Sets default for contexts of a custom field. Default are defined using these objects:
   *
   * - `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.
   * - `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for date-time fields.
   * - `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for single choice select lists and radio
   *   buttons.
   * - `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for multiple choice select lists and
   *   checkboxes.
   * - `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`) for cascading select lists.
   * - `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`) for single users.
   * - `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`) for user lists.
   * - `CustomFieldContextDefaultValueSingleGroupPicker` (type `grouppicker.single`) for single choice group pickers.
   * - `CustomFieldContextDefaultValueMultipleGroupPicker` (type `grouppicker.multiple`) for multiple choice group
   *   pickers.
   * - `CustomFieldContextDefaultValueURL` (type `url`) for URLs.
   * - `CustomFieldContextDefaultValueProject` (type `project`) for project pickers.
   * - `CustomFieldContextDefaultValueFloat` (type `float`) for floats (floating-point numbers).
   * - `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.
   * - `CustomFieldContextDefaultValueTextField` (type `textfield`) for text fields.
   * - `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area fields.
   * - `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only (text) fields.
   * - `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`) for single choice version pickers.
   * - `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for multiple choice version pickers.
   *
   * Forge custom fields
   * [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types)
   * are also supported, returning:
   *
   * - `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`) for Forge string fields.
   * - `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type `forge.string.list`) for Forge string collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`) for Forge object fields.
   * - `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type `forge.datetime`) for Forge date-time fields.
   * - `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`) for Forge group fields.
   * - `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type `forge.group.list`) for Forge group collection
   *   fields.
   * - `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`) for Forge number fields.
   * - `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for Forge user fields.
   * - `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type `forge.user.list`) for Forge user collection fields.
   *
   * Only one type of default object can be included in a request. To remove a default for a context, set the default
   * parameter to `null`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultValues<T = void>(parameters: Parameters.SetDefaultValues, callback?: never): Promise<T>;
  async setDefaultValues<T = void>(parameters: Parameters.SetDefaultValues, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/defaultValue`,
      method: 'PUT',
      data: {
        defaultValues: parameters.defaultValues,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * context to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts.
   * Mappings are ordered first by context ID and then by issue type ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeMappingsForContexts<T = Models.PageIssueTypeToContextMapping>(
    parameters: Parameters.GetIssueTypeMappingsForContexts | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * context to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts.
   * Mappings are ordered first by context ID and then by issue type ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeMappingsForContexts<T = Models.PageIssueTypeToContextMapping>(
    parameters: Parameters.GetIssueTypeMappingsForContexts | string,
    callback?: never
  ): Promise<T>;
  async getIssueTypeMappingsForContexts<T = Models.PageIssueTypeToContextMapping>(
    parameters: Parameters.GetIssueTypeMappingsForContexts | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/field/${fieldId}/context/issuetypemapping`,
      method: 'GET',
      params: {
        contextId: typeof parameters !== 'string' && parameters.contextId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * project and issue type mappings and, for each mapping, the ID of a [custom field
   * context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.
   *
   * If there is no custom field context assigned to the project then, if present, the custom field context that applies
   * to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is
   * not found, the returned custom field context ID is `null`.
   *
   * Duplicate project and issue type mappings cannot be provided in the request.
   *
   * The order of the returned values is the same as provided in the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageContextForProjectAndIssueType>(
    parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * project and issue type mappings and, for each mapping, the ID of a [custom field
   * context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.
   *
   * If there is no custom field context assigned to the project then, if present, the custom field context that applies
   * to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is
   * not found, the returned custom field context ID is `null`.
   *
   * Duplicate project and issue type mappings cannot be provided in the request.
   *
   * The order of the returned values is the same as provided in the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageContextForProjectAndIssueType>(
    parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes,
    callback?: never
  ): Promise<T>;
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageContextForProjectAndIssueType>(
    parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/mapping`,
      method: 'POST',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
      data: {
        mappings: parameters.mappings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings
   * are returned. Invalid IDs are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectContextMapping<T = Models.PageCustomFieldContextProjectMapping>(
    parameters: Parameters.GetProjectContextMapping | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings
   * are returned. Invalid IDs are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectContextMapping<T = Models.PageCustomFieldContextProjectMapping>(
    parameters: Parameters.GetProjectContextMapping | string,
    callback?: never
  ): Promise<T>;
  async getProjectContextMapping<T = Models.PageCustomFieldContextProjectMapping>(
    parameters: Parameters.GetProjectContextMapping | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/field/${fieldId}/context/projectmapping`,
      method: 'GET',
      params: {
        contextId: typeof parameters !== 'string' && parameters.contextId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a [custom field
   * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomFieldContext<T = void>(
    parameters: Parameters.UpdateCustomFieldContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a [custom field
   * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateCustomFieldContext<T = void>(
    parameters: Parameters.UpdateCustomFieldContext,
    callback?: never
  ): Promise<T>;
  async updateCustomFieldContext<T = void>(
    parameters: Parameters.UpdateCustomFieldContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a [custom field
   * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomFieldContext<T = void>(
    parameters: Parameters.DeleteCustomFieldContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a [custom field
   * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteCustomFieldContext<T = void>(
    parameters: Parameters.DeleteCustomFieldContext,
    callback?: never
  ): Promise<T>;
  async deleteCustomFieldContext<T = void>(
    parameters: Parameters.DeleteCustomFieldContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds issue types to a custom field context, appending the issue types to the issue types list.
   *
   * A custom field context without any issue types applies to all issue types. Adding issue types to such a custom
   * field context would result in it applying to only the listed issue types.
   *
   * If any of the issue types exists in the custom field context, the operation fails and no issue types are added.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addIssueTypesToContext<T = void>(
    parameters: Parameters.AddIssueTypesToContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds issue types to a custom field context, appending the issue types to the issue types list.
   *
   * A custom field context without any issue types applies to all issue types. Adding issue types to such a custom
   * field context would result in it applying to only the listed issue types.
   *
   * If any of the issue types exists in the custom field context, the operation fails and no issue types are added.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addIssueTypesToContext<T = void>(parameters: Parameters.AddIssueTypesToContext, callback?: never): Promise<T>;
  async addIssueTypesToContext<T = void>(
    parameters: Parameters.AddIssueTypesToContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes issue types from a custom field context.
   *
   * A custom field context without any issue types applies to all issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypesFromContext<T = void>(
    parameters: Parameters.RemoveIssueTypesFromContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes issue types from a custom field context.
   *
   * A custom field context without any issue types applies to all issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypesFromContext<T = void>(
    parameters: Parameters.RemoveIssueTypesFromContext,
    callback?: never
  ): Promise<T>;
  async removeIssueTypesFromContext<T = void>(
    parameters: Parameters.RemoveIssueTypesFromContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype/remove`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns a custom field context to projects.
   *
   * If any project in the request is assigned to any context of the custom field, the operation fails.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignProjectsToCustomFieldContext<T = void>(
    parameters: Parameters.AssignProjectsToCustomFieldContext,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns a custom field context to projects.
   *
   * If any project in the request is assigned to any context of the custom field, the operation fails.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignProjectsToCustomFieldContext<T = void>(
    parameters: Parameters.AssignProjectsToCustomFieldContext,
    callback?: never
  ): Promise<T>;
  async assignProjectsToCustomFieldContext<T = void>(
    parameters: Parameters.AssignProjectsToCustomFieldContext,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project`,
      method: 'PUT',
      data: {
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a custom field context from projects.
   *
   * A custom field context without any projects applies to all projects. Removing all projects from a custom field
   * context would result in it applying to all projects.
   *
   * If any project in the request is not assigned to the context, or the operation would result in two global contexts
   * for the field, the operation fails.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeCustomFieldContextFromProjects<T = void>(
    parameters: Parameters.RemoveCustomFieldContextFromProjects,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes a custom field context from projects.
   *
   * A custom field context without any projects applies to all projects. Removing all projects from a custom field
   * context would result in it applying to all projects.
   *
   * If any project in the request is not assigned to the context, or the operation would result in two global contexts
   * for the field, the operation fails.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeCustomFieldContextFromProjects<T = void>(
    parameters: Parameters.RemoveCustomFieldContextFromProjects,
    callback?: never
  ): Promise<T>;
  async removeCustomFieldContextFromProjects<T = void>(
    parameters: Parameters.RemoveCustomFieldContextFromProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project/remove`,
      method: 'POST',
      data: {
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
