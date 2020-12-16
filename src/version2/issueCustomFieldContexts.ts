import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldContexts {
  constructor(private client: Client) { }
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback: Callback<T>): Promise<void>;
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback?: undefined): Promise<T>;
  async getContextsForField<T = Models.PageBeanCustomFieldContext>(parameters: Parameters.GetContextsForField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context`,
      method: 'GET',
      params: {
        isAnyIssueType: parameters.isAnyIssueType,
        isGlobalContext: parameters.isGlobalContext,
        contextId: parameters.contextId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createCustomFieldContext<T = any>(parameters: Parameters.CreateCustomFieldContext, callback: Callback<T>): Promise<void>;
  async createCustomFieldContext<T = any>(parameters: Parameters.CreateCustomFieldContext, callback?: undefined): Promise<T>;
  async createCustomFieldContext<T = any>(parameters: Parameters.CreateCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback: Callback<T>): Promise<void>;
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback?: undefined): Promise<T>;
  async getCustomFieldContextsForProjectsAndIssueTypes<T = Models.PageBeanContextForProjectAndIssueType>(parameters: Parameters.GetCustomFieldContextsForProjectsAndIssueTypes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/mapping`,
      method: 'POST',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateCustomFieldContext<T = any>(parameters: Parameters.UpdateCustomFieldContext, callback: Callback<T>): Promise<void>;
  async updateCustomFieldContext<T = any>(parameters: Parameters.UpdateCustomFieldContext, callback?: undefined): Promise<T>;
  async updateCustomFieldContext<T = any>(parameters: Parameters.UpdateCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteCustomFieldContext<T = any>(parameters: Parameters.DeleteCustomFieldContext, callback: Callback<T>): Promise<void>;
  async deleteCustomFieldContext<T = any>(parameters: Parameters.DeleteCustomFieldContext, callback?: undefined): Promise<T>;
  async deleteCustomFieldContext<T = any>(parameters: Parameters.DeleteCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addIssueTypesToContext<T = any>(parameters: Parameters.AddIssueTypesToContext, callback: Callback<T>): Promise<void>;
  async addIssueTypesToContext<T = any>(parameters: Parameters.AddIssueTypesToContext, callback?: undefined): Promise<T>;
  async addIssueTypesToContext<T = any>(parameters: Parameters.AddIssueTypesToContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignProjectsToCustomFieldContext<T = any>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback: Callback<T>): Promise<void>;
  async assignProjectsToCustomFieldContext<T = any>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback?: undefined): Promise<T>;
  async assignProjectsToCustomFieldContext<T = any>(parameters: Parameters.AssignProjectsToCustomFieldContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/project`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeCustomFieldContextFromProjects<T = any>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback: Callback<T>): Promise<void>;
  async removeCustomFieldContextFromProjects<T = any>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback?: undefined): Promise<T>;
  async removeCustomFieldContextFromProjects<T = any>(parameters: Parameters.RemoveCustomFieldContextFromProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/project/remove`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
