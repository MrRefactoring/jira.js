import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldOptionsApps {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of all the options of a select list issue field. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select a value from a list of options.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetAllIssueFieldOptions, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of all the options of a select list issue field. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select a value from a list of options.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetAllIssueFieldOptions, callback?: undefined): Promise<T>;
  async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetAllIssueFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllIssueFieldOptions' });
  }
  /**
     * Creates an option for a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback: Callback<T>): Promise<void>;
  /**
     * Creates an option for a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback?: undefined): Promise<T>;
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option`,
      method: 'POST',
      data: {
        value: parameters.value,
        properties: parameters.properties,
        config: parameters.config,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createIssueFieldOption' });
  }
  /**
     * Returns a [paginated](#pagination) list of options for a select list issue field that can be viewed and selected by the user.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetSelectableIssueFieldOptions, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of options for a select list issue field that can be viewed and selected by the user.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetSelectableIssueFieldOptions, callback?: undefined): Promise<T>;
  async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetSelectableIssueFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/edit`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getSelectableIssueFieldOptions' });
  }
  /**
     * Returns a [paginated](#pagination) list of options for a select list issue field that can be viewed by the user.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetVisibleIssueFieldOptions, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of options for a select list issue field that can be viewed by the user.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetVisibleIssueFieldOptions, callback?: undefined): Promise<T>;
  async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetVisibleIssueFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/search`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getVisibleIssueFieldOptions' });
  }
  /**
     * Returns an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback: Callback<T>): Promise<void>;
  /**
     * Returns an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback?: undefined): Promise<T>;
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getIssueFieldOption' });
  }
  /**
     * Updates or creates an option for a select list issue field. This operation requires that the option ID is provided when creating an option, therefore, the option ID needs to be specified as a path and body parameter. The option ID provided in the path and body must be identical.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback: Callback<T>): Promise<void>;
  /**
     * Updates or creates an option for a select list issue field. This operation requires that the option ID is provided when creating an option, therefore, the option ID needs to be specified as a path and body parameter. The option ID provided in the path and body must be identical.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback?: undefined): Promise<T>;
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        value: parameters.value,
        properties: parameters.properties,
        config: parameters.config,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateIssueFieldOption' });
  }
  /**
     * Deletes an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async deleteIssueFieldOption<T = void>(parameters: Parameters.DeleteIssueFieldOption, callback: Callback<T>): Promise<void>;
  /**
     * Deletes an option from a select list issue field.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async deleteIssueFieldOption<T = void>(parameters: Parameters.DeleteIssueFieldOption, callback?: undefined): Promise<T>;
  async deleteIssueFieldOption<T = void>(parameters: Parameters.DeleteIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteIssueFieldOption' });
  }
  /**
     * Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.
     *
     * This is an [asynchronous operation](#async). The response object contains a link to the long-running task.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async replaceIssueFieldOption<T = unknown>(parameters: Parameters.ReplaceIssueFieldOption, callback: Callback<T>): Promise<void>;
  /**
     * Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.
     *
     * This is an [asynchronous operation](#async). The response object contains a link to the long-running task.
     *
     * Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field. */
  async replaceIssueFieldOption<T = unknown>(parameters: Parameters.ReplaceIssueFieldOption, callback?: undefined): Promise<T>;
  async replaceIssueFieldOption<T = unknown>(parameters: Parameters.ReplaceIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
      method: 'DELETE',
      params: {
        replaceWith: parameters.replaceWith,
        jql: parameters.jql,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'replaceIssueFieldOption' });
  }
}
