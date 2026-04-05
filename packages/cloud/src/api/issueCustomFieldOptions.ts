import { CustomFieldOptionSchema, type CustomFieldOption } from '#/models/customFieldOption';
import {
  PageCustomFieldContextOptionSchema,
  type PageCustomFieldContextOption,
} from '#/models/pageCustomFieldContextOption';
import {
  CustomFieldCreatedContextOptionsListSchema,
  type CustomFieldCreatedContextOptionsList,
} from '#/models/customFieldCreatedContextOptionsList';
import {
  CustomFieldUpdatedContextOptionsListSchema,
  type CustomFieldUpdatedContextOptionsList,
} from '#/models/customFieldUpdatedContextOptionsList';
import { type GetCustomFieldOption } from '#/parameters/getCustomFieldOption';
import { type GetOptionsForContext } from '#/parameters/getOptionsForContext';
import { type CreateCustomFieldOption } from '#/parameters/createCustomFieldOption';
import { type UpdateCustomFieldOption } from '#/parameters/updateCustomFieldOption';
import { type ReorderCustomFieldOptions } from '#/parameters/reorderCustomFieldOptions';
import { type DeleteCustomFieldOption } from '#/parameters/deleteCustomFieldOption';
import { type ReplaceCustomFieldOption } from '#/parameters/replaceCustomFieldOption';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a custom field option. For example, an option in a select list.
 *
 * Note that this operation **only works for issue field select list options created in Jira or using operations from
 * the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource**, it cannot be used with issue field select list options created by Connect apps.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The custom
 * field option is returned as follows:
 *
 * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for at least
 *   one project the custom field is used in, and the field is visible in at least one layout the user has permission to
 *   view.
 */
export async function getCustomFieldOption(
  client: Client,
  parameters: GetCustomFieldOption,
): Promise<CustomFieldOption> {
  const config: SendRequestOptions<CustomFieldOption> = {
    url: `/rest/api/3/customFieldOption/${parameters.id}`,
    method: 'GET',
    schema: CustomFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * custom field option for a context. Options are returned first then cascading options, in the order they display in
 * Jira.
 *
 * This operation works for custom field options created in Jira or the operations from this resource. **To work with
 * issue field select list options created for Connect apps use the [Issue custom field options
 * (apps)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-issue-custom-field-options--apps-)
 * operations.**
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). _Edit Workflow_ [edit workflow
 * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)
 */
export async function getOptionsForContext(
  client: Client,
  parameters: GetOptionsForContext,
): Promise<PageCustomFieldContextOption> {
  const config: SendRequestOptions<PageCustomFieldContextOption> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
    method: 'GET',
    searchParams: {
      optionId: parameters.optionId,
      onlyOptions: parameters.onlyOptions,
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageCustomFieldContextOptionSchema,
  };

  return await client.sendRequest(config);
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
 * (apps)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-issue-custom-field-options--apps-)
 * operations.**
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createCustomFieldOption(
  client: Client,
  parameters: CreateCustomFieldOption,
): Promise<CustomFieldCreatedContextOptionsList> {
  const config: SendRequestOptions<CustomFieldCreatedContextOptionsList> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
    method: 'POST',
    body: {
      options: parameters.options,
    },
    schema: CustomFieldCreatedContextOptionsListSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the options of a custom field.
 *
 * If any of the options are not found, no options are updated. Options where the values in the request match the
 * current values aren't updated and aren't reported in the response.
 *
 * Note that this operation **only works for issue field select list options created in Jira or using operations from
 * the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource**, it cannot be used with issue field select list options created by Connect apps.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateCustomFieldOption(
  client: Client,
  parameters: UpdateCustomFieldOption,
): Promise<CustomFieldUpdatedContextOptionsList> {
  const config: SendRequestOptions<CustomFieldUpdatedContextOptionsList> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
    method: 'PUT',
    body: {
      options: parameters.options,
    },
    schema: CustomFieldUpdatedContextOptionsListSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Changes the order of custom field options or cascading options in a context.
 *
 * This operation works for custom field options created in Jira or the operations from this resource. **To work with
 * issue field select list options created for Connect apps use the [Issue custom field options
 * (apps)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-issue-custom-field-options--apps-)
 * operations.**
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function reorderCustomFieldOptions(client: Client, parameters: ReorderCustomFieldOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
    method: 'PUT',
    body: {
      after: parameters.after,
      customFieldOptionIds: parameters.customFieldOptionIds,
      position: parameters.position,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a custom field option.
 *
 * Options with cascading options cannot be deleted without deleting the cascading options first.
 *
 * This operation works for custom field options created in Jira or the operations from this resource. **To work with
 * issue field select list options created for Connect apps use the [Issue custom field options
 * (apps)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-issue-custom-field-options--apps-)
 * operations.**
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteCustomFieldOption(client: Client, parameters: DeleteCustomFieldOption): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Replaces the options of a custom field.
 *
 * Note that this operation **only works for issue field select list options created in Jira or using operations from
 * the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource**, it cannot be used with issue field select list options created by Connect or Forge apps.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function replaceCustomFieldOption(client: Client, parameters: ReplaceCustomFieldOption): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}/issue`,
    method: 'DELETE',
    searchParams: {
      replaceWith: parameters.replaceWith,
      jql: parameters.jql,
    },
  };

  return await client.sendRequest(config);
}
