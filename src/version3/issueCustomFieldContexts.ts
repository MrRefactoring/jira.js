import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldContexts {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of [ contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom field. Contexts can be returned as follows:
     *
     *  *  With no other parameters set, all contexts.
     *  *  By defining `id` only, all contexts from the list of IDs.
     *  *  By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types (true) or those that apply to only a subset of issue types (false)
     *  *  By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global contexts) (true) or those that apply to only a subset of projects (false).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of [ contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom field. Contexts can be returned as follows:
     *
     *  *  With no other parameters set, all contexts.
     *  *  By defining `id` only, all contexts from the list of IDs.
     *  *  By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types (true) or those that apply to only a subset of issue types (false)
     *  *  By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global contexts) (true) or those that apply to only a subset of projects (false).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback?: undefined): Promise<T>;
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context`,
      method: 'GET',
      params: {
        isAnyIssueType: parameters.isAnyIssueType,
        isGlobalContext: parameters.isGlobalContext,
        contextId: parameters.contextId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getContextsForField' });
  }
  /**
     * Creates a custom field context.
     *
     * If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If `issueTypeIds` is empty, the context applies to all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(parameters: Parameters.CreateCustomFieldContext, callback: Callback<T>): Promise<void>;
  /**
     * Creates a custom field context.
     *
     * If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If `issueTypeIds` is empty, the context applies to all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(parameters: Parameters.CreateCustomFieldContext, callback?: undefined): Promise<T>;
  async createCustomFieldContext<T = Models.CreateCustomFieldContext>(parameters: Parameters.CreateCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context`,
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
        projectIds: parameters.projectIds,
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createCustomFieldContext' });
  }
  /**
     * Returns a [paginated](#pagination) list of context to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts. Mappings are ordered first by context ID and then by issue type ID.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeMappingsForContexts<T = Models.PageBeanIssueTypeToContextMapping>(parameters: Parameters.GetIssueTypeMappingsForContexts, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of context to issue type mappings for a custom field. Mappings are returned for all contexts or a list of contexts. Mappings are ordered first by context ID and then by issue type ID.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeMappingsForContexts<T = Models.PageBeanIssueTypeToContextMapping>(parameters: Parameters.GetIssueTypeMappingsForContexts, callback?: undefined): Promise<T>;
  async getIssueTypeMappingsForContexts<T = Models.PageBeanIssueTypeToContextMapping>(parameters: Parameters.GetIssueTypeMappingsForContexts, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/issueTypeMapping`,
      method: 'GET',
      params: {
        contextId: parameters.contextId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeMappingsForContexts' });
  }
  /**
     * Returns a [paginated](#pagination) list of project and issue type mappings and, for each mapping, the ID of a [custom field context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.
     *
     * If there is no custom field context assigned to the project then, if present, the custom field context that applies to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not found, the returned custom field context ID is `null`.
     *
     * Duplicate project and issue type mappings cannot be provided in the request.
     *
     * The order of the returned values is the same as provided in the request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of project and issue type mappings and, for each mapping, the ID of a [custom field context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.
     *
     * If there is no custom field context assigned to the project then, if present, the custom field context that applies to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not found, the returned custom field context ID is `null`.
     *
     * Duplicate project and issue type mappings cannot be provided in the request.
     *
     * The order of the returned values is the same as provided in the request.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback?: undefined): Promise<T>;
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/mapping`,
      method: 'POST',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
      data: {
        mappings: parameters.mappings,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getCustomFieldContextsForProjectsAndIssueTypes' });
  }
  /**
     * Updates a [ custom field context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldContext<T = void>(parameters: Parameters.UpdateCustomFieldContext, callback: Callback<T>): Promise<void>;
  /**
     * Updates a [ custom field context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateCustomFieldContext<T = void>(parameters: Parameters.UpdateCustomFieldContext, callback?: undefined): Promise<T>;
  async updateCustomFieldContext<T = void>(parameters: Parameters.UpdateCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateCustomFieldContext' });
  }
  /**
     * Deletes a [ custom field context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteCustomFieldContext<T = void>(parameters: Parameters.DeleteCustomFieldContext, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a [ custom field context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteCustomFieldContext<T = void>(parameters: Parameters.DeleteCustomFieldContext, callback?: undefined): Promise<T>;
  async deleteCustomFieldContext<T = void>(parameters: Parameters.DeleteCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteCustomFieldContext' });
  }
  /**
     * Adds issue types to a custom field context, appending the issue types to the issue types list.
     *
     * A custom field context without any issue types applies to all issue types. Adding issue types to such a custom field context would result in it applying to only the listed issue types.
     *
     * If any of the issue types exists in the custom field context, the operation fails and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addIssueTypesToContext<T = void>(parameters: Parameters.AddIssueTypesToContext, callback: Callback<T>): Promise<void>;
  /**
     * Adds issue types to a custom field context, appending the issue types to the issue types list.
     *
     * A custom field context without any issue types applies to all issue types. Adding issue types to such a custom field context would result in it applying to only the listed issue types.
     *
     * If any of the issue types exists in the custom field context, the operation fails and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addIssueTypesToContext<T = void>(parameters: Parameters.AddIssueTypesToContext, callback?: undefined): Promise<T>;
  async addIssueTypesToContext<T = void>(parameters: Parameters.AddIssueTypesToContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'addIssueTypesToContext' });
  }
  /**
     * Removes issue types from a custom field context.
     *
     * A custom field context without any issue types applies to all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeIssueTypesFromContext<T = void>(parameters: Parameters.RemoveIssueTypesFromContext, callback: Callback<T>): Promise<void>;
  /**
     * Removes issue types from a custom field context.
     *
     * A custom field context without any issue types applies to all issue types.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeIssueTypesFromContext<T = void>(parameters: Parameters.RemoveIssueTypesFromContext, callback?: undefined): Promise<T>;
  async removeIssueTypesFromContext<T = void>(parameters: Parameters.RemoveIssueTypesFromContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype/remove`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'removeIssueTypesFromContext' });
  }
  /**
     * Assigns a custom field context to projects.
     *
     * If any project in the request is assigned to any context of the custom field, the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignProjectsToCustomFieldContext<T = void>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback: Callback<T>): Promise<void>;
  /**
     * Assigns a custom field context to projects.
     *
     * If any project in the request is assigned to any context of the custom field, the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignProjectsToCustomFieldContext<T = void>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback?: undefined): Promise<T>;
  async assignProjectsToCustomFieldContext<T = void>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project`,
      method: 'PUT',
      data: {
        projectIds: parameters.projectIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'assignProjectsToCustomFieldContext' });
  }
  /**
     * Removes a custom field context from projects.
     *
     * A custom field context without any projects applies to all projects. Removing all projects from a custom field context would result in it applying to all projects.
     *
     * If any project in the request is not assigned to the context, or the operation would result in two global contexts for the field, the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeCustomFieldContextFromProjects<T = void>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback: Callback<T>): Promise<void>;
  /**
     * Removes a custom field context from projects.
     *
     * A custom field context without any projects applies to all projects. Removing all projects from a custom field context would result in it applying to all projects.
     *
     * If any project in the request is not assigned to the context, or the operation would result in two global contexts for the field, the operation fails.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeCustomFieldContextFromProjects<T = void>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback?: undefined): Promise<T>;
  async removeCustomFieldContextFromProjects<T = void>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/project/remove`,
      method: 'POST',
      data: {
        projectIds: parameters.projectIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'removeCustomFieldContextFromProjects' });
  }
}
