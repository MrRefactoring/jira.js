import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueFieldConfigurations {
  constructor(private client: Client) {
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all field configurations.
   *
   * Only field configurations used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters: Parameters.GetAllFieldConfigurations | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all field configurations.
   *
   * Only field configurations used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters?: Parameters.GetAllFieldConfigurations, callback?: never): Promise<T>;
  async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters?: Parameters.GetAllFieldConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/fieldconfiguration',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        isDefault: parameters?.isDefault,
        query: parameters?.query,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.getAllFieldConfigurations' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all fields for a configuration.
   *
   * Only the fields from configurations used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all fields for a configuration.
   *
   * Only the fields from configurations used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback?: never): Promise<T>;
  async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: Parameters.GetFieldConfigurationItems, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/fieldconfiguration/${parameters.id}/fields`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.getFieldConfigurationItems' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration schemes.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters: Parameters.GetAllFieldConfigurationSchemes | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration schemes.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters?: Parameters.GetAllFieldConfigurationSchemes, callback?: never): Promise<T>;
  async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters?: Parameters.GetAllFieldConfigurationSchemes, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.getAllFieldConfigurationSchemes' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration issue type items.
   *
   * Only items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters: Parameters.GetFieldConfigurationSchemeMappings | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration issue type items.
   *
   * Only items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters?: Parameters.GetFieldConfigurationSchemeMappings, callback?: never): Promise<T>;
  async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters?: Parameters.GetFieldConfigurationSchemeMappings, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.getFieldConfigurationSchemeMappings' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration schemes and, for each scheme, a list of the projects that use it.
   *
   * The list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to the default field configuration scheme.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of field configuration schemes and, for each scheme, a list of the projects that use it.
   *
   * The list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to the default field configuration scheme.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback?: never): Promise<T>;
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: Parameters.GetFieldConfigurationSchemeProjectMapping, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.getFieldConfigurationSchemeProjectMapping' });
  }

  /**
   * Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme.
   *
   * Field configuration schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignFieldConfigurationSchemeToProject<T = void>(parameters: Parameters.AssignFieldConfigurationSchemeToProject | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme.
   *
   * Field configuration schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignFieldConfigurationSchemeToProject<T = void>(parameters?: Parameters.AssignFieldConfigurationSchemeToProject, callback?: never): Promise<T>;
  async assignFieldConfigurationSchemeToProject<T = void>(parameters?: Parameters.AssignFieldConfigurationSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/fieldconfigurationscheme/project',
      method: 'PUT',
      data: {
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.issueFieldConfigurations.assignFieldConfigurationSchemeToProject' });
  }
}
