import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldOptionsapps {
  constructor(private client: Client) { }
  async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetAllIssueFieldOptions, callback: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback: Callback<T>): Promise<void>;
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback?: undefined): Promise<T>;
  async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.CreateIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetSelectableIssueFieldOptions, callback: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: Parameters.GetVisibleIssueFieldOptions, callback: Callback<T>): Promise<void>;
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

    return this.client.sendRequest(config, callback);
  }
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback: Callback<T>): Promise<void>;
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback?: undefined): Promise<T>;
  async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.GetIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback: Callback<T>): Promise<void>;
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback?: undefined): Promise<T>;
  async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: Parameters.UpdateIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueFieldOption<T = any>(parameters: Parameters.DeleteIssueFieldOption, callback: Callback<T>): Promise<void>;
  async deleteIssueFieldOption<T = any>(parameters: Parameters.DeleteIssueFieldOption, callback?: undefined): Promise<T>;
  async deleteIssueFieldOption<T = any>(parameters: Parameters.DeleteIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async replaceIssueFieldOption<T = any>(parameters: Parameters.ReplaceIssueFieldOption, callback: Callback<T>): Promise<void>;
  async replaceIssueFieldOption<T = any>(parameters: Parameters.ReplaceIssueFieldOption, callback?: undefined): Promise<T>;
  async replaceIssueFieldOption<T = any>(parameters: Parameters.ReplaceIssueFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
      method: 'DELETE',
      params: {
        replaceWith: parameters.replaceWith,
        jql: parameters.jql,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
