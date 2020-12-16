import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeScreenSchemes {
  constructor(private client: Client) { }
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: Callback<T>): Promise<void>;
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: undefined): Promise<T>;
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueTypeScreenScheme<T = any>(callback?: Callback<T>): Promise<void>;
  async createIssueTypeScreenScheme<T = any>(callback?: undefined): Promise<T>;
  async createIssueTypeScreenScheme<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: Callback<T>): Promise<void>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: undefined): Promise<T>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetypescreenscheme/mapping',
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
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignIssueTypeScreenSchemeToProject<T = any>(callback?: Callback<T>): Promise<void>;
  async assignIssueTypeScreenSchemeToProject<T = any>(callback?: undefined): Promise<T>;
  async assignIssueTypeScreenSchemeToProject<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueTypeScreenScheme<T = any>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async updateIssueTypeScreenScheme<T = any>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async updateIssueTypeScreenScheme<T = any>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueTypeScreenScheme<T = any>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async deleteIssueTypeScreenScheme<T = any>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async deleteIssueTypeScreenScheme<T = any>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDefaultScreenScheme<T = any>(parameters: Parameters.UpdateDefaultScreenScheme, callback: Callback<T>): Promise<void>;
  async updateDefaultScreenScheme<T = any>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: undefined): Promise<T>;
  async updateDefaultScreenScheme<T = any>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeMappingsFromIssueTypeScreenScheme<T = any>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  async removeMappingsFromIssueTypeScreenScheme<T = any>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: undefined): Promise<T>;
  async removeMappingsFromIssueTypeScreenScheme<T = any>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
