import { PageIssueFieldOptionSchema, type PageIssueFieldOption } from '#/models/pageIssueFieldOption';
import { IssueFieldOptionSchema, type IssueFieldOption } from '#/models/issueFieldOption';
import { type GetAllIssueFieldOptions } from '#/parameters/getAllIssueFieldOptions';
import { type CreateIssueFieldOption } from '#/parameters/createIssueFieldOption';
import { type GetSelectableIssueFieldOptions } from '#/parameters/getSelectableIssueFieldOptions';
import { type GetVisibleIssueFieldOptions } from '#/parameters/getVisibleIssueFieldOptions';
import { type GetIssueFieldOption } from '#/parameters/getIssueFieldOption';
import { type UpdateIssueFieldOption } from '#/parameters/updateIssueFieldOption';
import { type DeleteIssueFieldOption } from '#/parameters/deleteIssueFieldOption';
import { type ReplaceIssueFieldOption } from '#/parameters/replaceIssueFieldOption';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all the
 * options of a select list issue field. A select list issue field is a type of [issue
 * field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select a
 * value from a list of options.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function getAllIssueFieldOptions(
  client: Client,
  parameters: GetAllIssueFieldOptions,
): Promise<PageIssueFieldOption> {
  const config: SendRequestOptions<PageIssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageIssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an option for a select list issue field.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * Each field can have a maximum of 10000 options, and each option can have a maximum of 10000 scopes.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function createIssueFieldOption(
  client: Client,
  parameters: CreateIssueFieldOption,
): Promise<IssueFieldOption> {
  const config: SendRequestOptions<IssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option`,
    method: 'POST',
    body: {
      config: parameters.config,
      properties: parameters.properties,
      value: parameters.value,
    },
    schema: IssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of options
 * for a select list issue field that can be viewed and selected by the user.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getSelectableIssueFieldOptions(
  client: Client,
  parameters: GetSelectableIssueFieldOptions,
): Promise<PageIssueFieldOption> {
  const config: SendRequestOptions<PageIssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/suggestions/edit`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      projectId: parameters.projectId,
    },
    schema: PageIssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of options
 * for a select list issue field that can be viewed by the user.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getVisibleIssueFieldOptions(
  client: Client,
  parameters: GetVisibleIssueFieldOptions,
): Promise<PageIssueFieldOption> {
  const config: SendRequestOptions<PageIssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/suggestions/search`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      projectId: parameters.projectId,
    },
    schema: PageIssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an option from a select list issue field.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function getIssueFieldOption(client: Client, parameters: GetIssueFieldOption): Promise<IssueFieldOption> {
  const config: SendRequestOptions<IssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
    method: 'GET',
    schema: IssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates or creates an option for a select list issue field. This operation requires that the option ID is provided
 * when creating an option, therefore, the option ID needs to be specified as a path and body parameter. The option ID
 * provided in the path and body must be identical.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function updateIssueFieldOption(
  client: Client,
  parameters: UpdateIssueFieldOption,
): Promise<IssueFieldOption> {
  const config: SendRequestOptions<IssueFieldOption> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
    method: 'PUT',
    body: {
      config: parameters.config,
      id: parameters.id,
      properties: parameters.properties,
      value: parameters.value,
    },
    schema: IssueFieldOptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an option from a select list issue field.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function deleteIssueFieldOption(client: Client, parameters: DeleteIssueFieldOption): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected
 * to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.
 *
 * Connect and Forge app users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) can
 * override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.
 *
 * This is an [asynchronous operation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async). The
 * response object contains a link to the long-running task.
 *
 * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used
 * with issue field select list options created in Jira or using operations from the [Issue custom field
 * options](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#api-group-Issue-custom-field-options)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the app providing the field.
 */
export async function replaceIssueFieldOption(client: Client, parameters: ReplaceIssueFieldOption): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
    method: 'DELETE',
    searchParams: {
      replaceWith: parameters.replaceWith,
      jql: parameters.jql,
      overrideScreenSecurity: parameters.overrideScreenSecurity,
      overrideEditableFlag: parameters.overrideEditableFlag,
    },
  };

  return await client.sendRequest(config);
}
