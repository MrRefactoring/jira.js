import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeScreenSchemes {
  constructor(private client: Client) { }
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: Callback<T>): Promise<void>;
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: undefined): Promise<T>;
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void>;
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        issueTypeMappings: parameters?.issueTypeMappings,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: Callback<T>): Promise<void>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: undefined): Promise<T>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescreenscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback?: undefined): Promise<T>;
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescreenscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: Callback<T>): Promise<void>;
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: undefined): Promise<T>;
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issuetypescreenscheme/project',
      method: 'PUT',
      data: {
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
      method: 'PUT',
      data: {
        issueTypeMappings: parameters.issueTypeMappings,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback: Callback<T>): Promise<void>;
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: undefined): Promise<T>;
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
      method: 'PUT',
      data: {
        screenSchemeId: parameters.screenSchemeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
