import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
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
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters?: Parameters.CreateIssueTypeScheme, callback?: Callback<T>): Promise<void>;
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters?: Parameters.CreateIssueTypeScheme, callback?: undefined): Promise<T>;
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters?: Parameters.CreateIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        defaultIssueTypeId: parameters?.defaultIssueTypeId,
        issueTypeIds: parameters?.issueTypeIds,
      },
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
  async assignIssueTypeSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeSchemeToProject, callback?: Callback<T>): Promise<void>;
  async assignIssueTypeSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeSchemeToProject, callback?: undefined): Promise<T>;
  async assignIssueTypeSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescheme/project',
      method: 'PUT',
      data: {
        issueTypeSchemeId: parameters?.issueTypeSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback?: undefined): Promise<T>;
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultIssueTypeId: parameters.defaultIssueTypeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback?: undefined): Promise<T>;
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: undefined): Promise<T>;
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: undefined): Promise<T>;
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
        after: parameters.after,
        position: parameters.position,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback: Callback<T>): Promise<void>;
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: undefined): Promise<T>;
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
