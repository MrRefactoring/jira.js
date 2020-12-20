import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueFieldConfigurations {
  constructor(private client: Client) { }
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters?: Parameters.GetAllFieldConfigurations, callback?: Callback<T>): Promise<void>;
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters?: Parameters.GetAllFieldConfigurations, callback?: undefined): Promise<T>;
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters?: Parameters.GetAllFieldConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/fieldconfiguration',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        isDefault: parameters?.isDefault,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback: Callback<T>): Promise<void>;
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback?: undefined): Promise<T>;
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/fieldconfiguration/${parameters.id}/fields`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters?: Parameters.GetAllFieldConfigurationSchemes, callback?: Callback<T>): Promise<void>;
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters?: Parameters.GetAllFieldConfigurationSchemes, callback?: undefined): Promise<T>;
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters?: Parameters.GetAllFieldConfigurationSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/fieldconfigurationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters?: Parameters.GetFieldConfigurationSchemeMappings, callback?: Callback<T>): Promise<void>;
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters?: Parameters.GetFieldConfigurationSchemeMappings, callback?: undefined): Promise<T>;
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters?: Parameters.GetFieldConfigurationSchemeMappings, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/fieldconfigurationscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback: Callback<T>): Promise<void>;
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback?: undefined): Promise<T>;
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignFieldConfigurationSchemeToProject<T = void>(parameters?: Parameters.AssignFieldConfigurationSchemeToProject, callback?: Callback<T>): Promise<void>;
  async assignFieldConfigurationSchemeToProject<T = void>(parameters?: Parameters.AssignFieldConfigurationSchemeToProject, callback?: undefined): Promise<T>;
  async assignFieldConfigurationSchemeToProject<T = void>(parameters?: Parameters.AssignFieldConfigurationSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'PUT',
      data: {
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
