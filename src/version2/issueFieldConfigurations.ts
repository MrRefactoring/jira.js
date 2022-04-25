import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueFieldConfigurations {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configurations. The list can be for all field configurations or a subset determined by any combination of these criteria:
   *
   * - A list of field configuration item IDs.
   * - Whether the field configuration is a default.
   * - Whether the field configuration name or description contains a query string.
   *
   * Only field configurations used in company-managed (classic) projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurations<T = Models.PageFieldConfiguration>(
    parameters: Parameters.GetAllFieldConfigurations | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configurations. The list can be for all field configurations or a subset determined by any combination of these criteria:
   *
   * - A list of field configuration item IDs.
   * - Whether the field configuration is a default.
   * - Whether the field configuration name or description contains a query string.
   *
   * Only field configurations used in company-managed (classic) projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurations<T = Models.PageFieldConfiguration>(
    parameters?: Parameters.GetAllFieldConfigurations,
    callback?: never
  ): Promise<T>;
  async getAllFieldConfigurations<T = Models.PageFieldConfiguration>(
    parameters?: Parameters.GetAllFieldConfigurations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfiguration',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        isDefault: parameters?.isDefault,
        query: parameters?.query,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a field configuration. The field configuration is created with the same field properties as the default
   * configuration, with all the fields being optional.
   *
   * This operation can only create configurations for use in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfiguration<T = Models.FieldConfiguration>(
    parameters: Parameters.CreateFieldConfiguration | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a field configuration. The field configuration is created with the same field properties as the default
   * configuration, with all the fields being optional.
   *
   * This operation can only create configurations for use in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfiguration<T = Models.FieldConfiguration>(
    parameters?: Parameters.CreateFieldConfiguration,
    callback?: never
  ): Promise<T>;
  async createFieldConfiguration<T = Models.FieldConfiguration>(
    parameters?: Parameters.CreateFieldConfiguration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfiguration',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a field configuration. The name and the description provided in the request override the existing values.
   *
   * This operation can only update configurations used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfiguration<T = void>(
    parameters: Parameters.UpdateFieldConfiguration,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a field configuration. The name and the description provided in the request override the existing values.
   *
   * This operation can only update configurations used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfiguration<T = void>(
    parameters: Parameters.UpdateFieldConfiguration,
    callback?: never
  ): Promise<T>;
  async updateFieldConfiguration<T = void>(
    parameters: Parameters.UpdateFieldConfiguration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a field configuration.
   *
   * This operation can only delete configurations used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfiguration<T = void>(
    parameters: Parameters.DeleteFieldConfiguration,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a field configuration.
   *
   * This operation can only delete configurations used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfiguration<T = void>(
    parameters: Parameters.DeleteFieldConfiguration,
    callback?: never
  ): Promise<T>;
  async deleteFieldConfiguration<T = void>(
    parameters: Parameters.DeleteFieldConfiguration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * fields for a configuration.
   *
   * Only the fields from configurations used in company-managed (classic) projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationItems<T = Models.PageFieldConfigurationItem>(
    parameters: Parameters.GetFieldConfigurationItems,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * fields for a configuration.
   *
   * Only the fields from configurations used in company-managed (classic) projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationItems<T = Models.PageFieldConfigurationItem>(
    parameters: Parameters.GetFieldConfigurationItems,
    callback?: never
  ): Promise<T>;
  async getFieldConfigurationItems<T = Models.PageFieldConfigurationItem>(
    parameters: Parameters.GetFieldConfigurationItems,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}/fields`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates fields in a field configuration. The properties of the field configuration fields provided override the
   * existing values.
   *
   * This operation can only update field configurations used in company-managed (classic) projects.
   *
   * The operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style
   * renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer
   * (`autocomplete-renderer`).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationItems<T = void>(
    parameters: Parameters.UpdateFieldConfigurationItems,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates fields in a field configuration. The properties of the field configuration fields provided override the
   * existing values.
   *
   * This operation can only update field configurations used in company-managed (classic) projects.
   *
   * The operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style
   * renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer
   * (`autocomplete-renderer`).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationItems<T = void>(
    parameters: Parameters.UpdateFieldConfigurationItems,
    callback?: never
  ): Promise<T>;
  async updateFieldConfigurationItems<T = void>(
    parameters: Parameters.UpdateFieldConfigurationItems,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}/fields`,
      method: 'PUT',
      data: {
        fieldConfigurationItems: parameters.fieldConfigurationItems,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurationSchemes<T = Models.PageFieldConfigurationScheme>(
    parameters: Parameters.GetAllFieldConfigurationSchemes | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurationSchemes<T = Models.PageFieldConfigurationScheme>(
    parameters?: Parameters.GetAllFieldConfigurationSchemes,
    callback?: never
  ): Promise<T>;
  async getAllFieldConfigurationSchemes<T = Models.PageFieldConfigurationScheme>(
    parameters?: Parameters.GetAllFieldConfigurationSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a field configuration scheme.
   *
   * This operation can only create field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfigurationScheme<T = Models.FieldConfigurationScheme>(
    parameters: Parameters.CreateFieldConfigurationScheme | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a field configuration scheme.
   *
   * This operation can only create field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfigurationScheme<T = Models.FieldConfigurationScheme>(
    parameters?: Parameters.CreateFieldConfigurationScheme,
    callback?: never
  ): Promise<T>;
  async createFieldConfigurationScheme<T = Models.FieldConfigurationScheme>(
    parameters?: Parameters.CreateFieldConfigurationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration issue type items.
   *
   * Only items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeMappings<T = Models.PageFieldConfigurationIssueTypeItem>(
    parameters: Parameters.GetFieldConfigurationSchemeMappings | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration issue type items.
   *
   * Only items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeMappings<T = Models.PageFieldConfigurationIssueTypeItem>(
    parameters?: Parameters.GetFieldConfigurationSchemeMappings,
    callback?: never
  ): Promise<T>;
  async getFieldConfigurationSchemeMappings<T = Models.PageFieldConfigurationIssueTypeItem>(
    parameters?: Parameters.GetFieldConfigurationSchemeMappings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes and, for each scheme, a list of the projects that use it.
   *
   * The list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to
   * the default field configuration scheme.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageFieldConfigurationSchemeProjects>(
    parameters: Parameters.GetFieldConfigurationSchemeProjectMapping,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes and, for each scheme, a list of the projects that use it.
   *
   * The list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to
   * the default field configuration scheme.
   *
   * Only field configuration schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageFieldConfigurationSchemeProjects>(
    parameters: Parameters.GetFieldConfigurationSchemeProjectMapping,
    callback?: never
  ): Promise<T>;
  async getFieldConfigurationSchemeProjectMapping<T = Models.PageFieldConfigurationSchemeProjects>(
    parameters: Parameters.GetFieldConfigurationSchemeProjectMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation
   * assigns the default field configuration scheme.
   *
   * Field configuration schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignFieldConfigurationSchemeToProject<T = void>(
    parameters: Parameters.AssignFieldConfigurationSchemeToProject | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation
   * assigns the default field configuration scheme.
   *
   * Field configuration schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignFieldConfigurationSchemeToProject<T = void>(
    parameters?: Parameters.AssignFieldConfigurationSchemeToProject,
    callback?: never
  ): Promise<T>;
  async assignFieldConfigurationSchemeToProject<T = void>(
    parameters?: Parameters.AssignFieldConfigurationSchemeToProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'PUT',
      data: {
        fieldConfigurationSchemeId: parameters?.fieldConfigurationSchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a field configuration scheme.
   *
   * This operation can only update field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationScheme<T = void>(
    parameters: Parameters.UpdateFieldConfigurationScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a field configuration scheme.
   *
   * This operation can only update field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationScheme<T = void>(
    parameters: Parameters.UpdateFieldConfigurationScheme,
    callback?: never
  ): Promise<T>;
  async updateFieldConfigurationScheme<T = void>(
    parameters: Parameters.UpdateFieldConfigurationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a field configuration scheme.
   *
   * This operation can only delete field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfigurationScheme<T = void>(
    parameters: Parameters.DeleteFieldConfigurationScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a field configuration scheme.
   *
   * This operation can only delete field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfigurationScheme<T = void>(
    parameters: Parameters.DeleteFieldConfigurationScheme,
    callback?: never
  ): Promise<T>;
  async deleteFieldConfigurationScheme<T = void>(
    parameters: Parameters.DeleteFieldConfigurationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns issue types to field configurations on field configuration scheme.
   *
   * This operation can only modify field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setFieldConfigurationSchemeMapping<T = void>(
    parameters: Parameters.SetFieldConfigurationSchemeMapping,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Assigns issue types to field configurations on field configuration scheme.
   *
   * This operation can only modify field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setFieldConfigurationSchemeMapping<T = void>(
    parameters: Parameters.SetFieldConfigurationSchemeMapping,
    callback?: never
  ): Promise<T>;
  async setFieldConfigurationSchemeMapping<T = void>(
    parameters: Parameters.SetFieldConfigurationSchemeMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}/mapping`,
      method: 'PUT',
      data: {
        mappings: parameters.mappings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes issue types from the field configuration scheme.
   *
   * This operation can only modify field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypesFromGlobalFieldConfigurationScheme<T = void>(
    parameters: Parameters.RemoveIssueTypesFromGlobalFieldConfigurationScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes issue types from the field configuration scheme.
   *
   * This operation can only modify field configuration schemes used in company-managed (classic) projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypesFromGlobalFieldConfigurationScheme<T = void>(
    parameters: Parameters.RemoveIssueTypesFromGlobalFieldConfigurationScheme,
    callback?: never
  ): Promise<T>;
  async removeIssueTypesFromGlobalFieldConfigurationScheme<T = void>(
    parameters: Parameters.RemoveIssueTypesFromGlobalFieldConfigurationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}/mapping/delete`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
