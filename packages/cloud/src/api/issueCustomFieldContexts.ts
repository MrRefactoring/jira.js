import { PageCustomFieldContextSchema, type PageCustomFieldContext } from '#/models/pageCustomFieldContext';
import { CreateCustomFieldContextSchema, type CreateCustomFieldContext } from '#/models/createCustomFieldContext';
import {
  PageIssueTypeToContextMappingSchema,
  type PageIssueTypeToContextMapping,
} from '#/models/pageIssueTypeToContextMapping';
import {
  PageContextForProjectAndIssueTypeSchema,
  type PageContextForProjectAndIssueType,
} from '#/models/pageContextForProjectAndIssueType';
import {
  PageCustomFieldContextProjectMappingSchema,
  type PageCustomFieldContextProjectMapping,
} from '#/models/pageCustomFieldContextProjectMapping';
import { type GetContextsForField } from '#/parameters/getContextsForField';
import { type CreateCustomFieldContext as CreateCustomFieldContextParameters } from '#/parameters/createCustomFieldContext';
import { type GetIssueTypeMappingsForContexts } from '#/parameters/getIssueTypeMappingsForContexts';
import { type GetCustomFieldContextsForProjectsAndIssueTypes } from '#/parameters/getCustomFieldContextsForProjectsAndIssueTypes';
import { type GetProjectContextMapping } from '#/parameters/getProjectContextMapping';
import { type UpdateCustomFieldContext } from '#/parameters/updateCustomFieldContext';
import { type DeleteCustomFieldContext } from '#/parameters/deleteCustomFieldContext';
import { type AddIssueTypesToContext } from '#/parameters/addIssueTypesToContext';
import { type RemoveIssueTypesFromContext } from '#/parameters/removeIssueTypesFromContext';
import { type AssignProjectsToCustomFieldContext } from '#/parameters/assignProjectsToCustomFieldContext';
import { type RemoveCustomFieldContextFromProjects } from '#/parameters/removeCustomFieldContextFromProjects';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of [
 * contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom
 * field. Contexts can be returned as follows:
 *
 * - With no other parameters set, all contexts.
 * - By defining `id` only, all contexts from the list of IDs.
 * - By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types
 *   (true) or those that apply to only a subset of issue types (false)
 * - By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global
 *   contexts) (true) or those that apply to only a subset of projects (false).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). _Edit Workflow_ [edit workflow
 * permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)
 */
export async function getContextsForField(
  client: Client,
  parameters: GetContextsForField,
): Promise<PageCustomFieldContext> {
  const config: SendRequestOptions<PageCustomFieldContext> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context`,
    method: 'GET',
    searchParams: {
      isAnyIssueType: parameters.isAnyIssueType,
      isGlobalContext: parameters.isGlobalContext,
      contextId: parameters.contextId,
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageCustomFieldContextSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a custom field context.
 *
 * If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If
 * `issueTypeIds` is empty, the context applies to all issue types.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createCustomFieldContext(
  client: Client,
  parameters: CreateCustomFieldContextParameters,
): Promise<CreateCustomFieldContext> {
  const config: SendRequestOptions<CreateCustomFieldContext> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context`,
    method: 'POST',
    body: {
      description: parameters.description,
      id: parameters.id,
      issueTypeIds: parameters.issueTypeIds,
      name: parameters.name,
      projectIds: parameters.projectIds,
    },
    schema: CreateCustomFieldContextSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of context
 * to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts. Mappings are
 * ordered first by context ID and then by issue type ID.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeMappingsForContexts(
  client: Client,
  parameters: GetIssueTypeMappingsForContexts,
): Promise<PageIssueTypeToContextMapping> {
  const config: SendRequestOptions<PageIssueTypeToContextMapping> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/issuetypemapping`,
    method: 'GET',
    searchParams: {
      contextId: parameters.contextId,
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageIssueTypeToContextMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of project
 * and issue type mappings and, for each mapping, the ID of a [custom field
 * context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.
 *
 * If there is no custom field context assigned to the project then, if present, the custom field context that applies
 * to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not
 * found, the returned custom field context ID is `null`.
 *
 * Duplicate project and issue type mappings cannot be provided in the request.
 *
 * The order of the returned values is the same as provided in the request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getCustomFieldContextsForProjectsAndIssueTypes(
  client: Client,
  parameters: GetCustomFieldContextsForProjectsAndIssueTypes,
): Promise<PageContextForProjectAndIssueType> {
  const config: SendRequestOptions<PageContextForProjectAndIssueType> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/mapping`,
    method: 'POST',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    body: {
      mappings: parameters.mappings,
    },
    schema: PageContextForProjectAndIssueTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of context
 * to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings are
 * returned. Invalid IDs are ignored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectContextMapping(
  client: Client,
  parameters: GetProjectContextMapping,
): Promise<PageCustomFieldContextProjectMapping> {
  const config: SendRequestOptions<PageCustomFieldContextProjectMapping> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/projectmapping`,
    method: 'GET',
    searchParams: {
      contextId: parameters.contextId,
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageCustomFieldContextProjectMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a [ custom field
 * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateCustomFieldContext(client: Client, parameters: UpdateCustomFieldContext): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a [ custom field
 * context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
 *
 * This API will not allow removing the global context from April 2026. Instead, an HTTP 400 response will be returned.
 * See [CHANGE-3019](https://developer.atlassian.com/changelog/#CHANGE-3019)
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteCustomFieldContext(client: Client, parameters: DeleteCustomFieldContext): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Adds issue types to a custom field context, appending the issue types to the issue types list.
 *
 * A custom field context without any issue types applies to all issue types. Adding issue types to such a custom field
 * context would result in it applying to only the listed issue types.
 *
 * If any of the issue types exists in the custom field context, the operation fails and no issue types are added.
 *
 * This API will not allow adding issue types to the global context from April 2026. Instead, an HTTP 400 response will
 * be returned. See [CHANGE-3019](https://developer.atlassian.com/changelog/#CHANGE-3019)
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addIssueTypesToContext(client: Client, parameters: AddIssueTypesToContext): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype`,
    method: 'PUT',
    body: {
      issueTypeIds: parameters.issueTypeIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes issue types from a custom field context.
 *
 * A custom field context without any issue types applies to all issue types.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeIssueTypesFromContext(
  client: Client,
  parameters: RemoveIssueTypesFromContext,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype/remove`,
    method: 'POST',
    body: {
      issueTypeIds: parameters.issueTypeIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Assigns a custom field context to projects.
 *
 * If any project in the request is assigned to any context of the custom field, the operation fails.
 *
 * This API will not allow adding projects to the global context from April 2026. Instead, an HTTP 400 response will be
 * returned. See [CHANGE-3019](https://developer.atlassian.com/changelog/#CHANGE-3019)
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function assignProjectsToCustomFieldContext(
  client: Client,
  parameters: AssignProjectsToCustomFieldContext,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project`,
    method: 'PUT',
    body: {
      projectIds: parameters.projectIds,
    },
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeCustomFieldContextFromProjects(
  client: Client,
  parameters: RemoveCustomFieldContextFromProjects,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project/remove`,
    method: 'POST',
    body: {
      projectIds: parameters.projectIds,
    },
  };

  return await client.sendRequest(config);
}
