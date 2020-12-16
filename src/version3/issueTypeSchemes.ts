import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeSchemes {
  constructor(private client: Client) { }
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters?: Parameters.GetAllIssueTypeSchemes, callback?: Callback<T>): Promise<void>;
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters?: Parameters.GetAllIssueTypeSchemes, callback?: undefined): Promise<T>;
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters?: Parameters.GetAllIssueTypeSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueTypeScheme<T = any>(callback?: Callback<T>): Promise<void>;
  async createIssueTypeScheme<T = any>(callback?: undefined): Promise<T>;
  async createIssueTypeScheme<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters?: Parameters.GetIssueTypeSchemesMapping, callback?: Callback<T>): Promise<void>;
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters?: Parameters.GetIssueTypeSchemesMapping, callback?: undefined): Promise<T>;
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters?: Parameters.GetIssueTypeSchemesMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeSchemeId: parameters?.issueTypeSchemeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback: Callback<T>): Promise<void>;
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback?: undefined): Promise<T>;
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignIssueTypeSchemeToProject<T = any>(callback?: Callback<T>): Promise<void>;
  async assignIssueTypeSchemeToProject<T = any>(callback?: undefined): Promise<T>;
  async assignIssueTypeSchemeToProject<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme/project',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueTypeScheme<T = any>(parameters: Parameters.UpdateIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async updateIssueTypeScheme<T = any>(parameters: Parameters.UpdateIssueTypeScheme, callback?: undefined): Promise<T>;
  async updateIssueTypeScheme<T = any>(parameters: Parameters.UpdateIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueTypeScheme<T = any>(parameters: Parameters.DeleteIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async deleteIssueTypeScheme<T = any>(parameters: Parameters.DeleteIssueTypeScheme, callback?: undefined): Promise<T>;
  async deleteIssueTypeScheme<T = any>(parameters: Parameters.DeleteIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addIssueTypesToIssueTypeScheme<T = any>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async addIssueTypesToIssueTypeScheme<T = any>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: undefined): Promise<T>;
  async addIssueTypesToIssueTypeScheme<T = any>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: undefined): Promise<T>;
  async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: undefined): Promise<T>;
  async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
