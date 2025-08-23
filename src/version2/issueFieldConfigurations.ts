import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllFieldConfigurationsParameters } from './parameters/getAllFieldConfigurationsParameters';
import type { CreateFieldConfigurationParameters } from './parameters/createFieldConfigurationParameters';
import type { DeleteFieldConfigurationParameters } from './parameters/deleteFieldConfigurationParameters';
import type { UpdateFieldConfigurationParameters } from './parameters/updateFieldConfigurationParameters';
import type { GetFieldConfigurationItemsParameters } from './parameters/getFieldConfigurationItemsParameters';
import type { UpdateFieldConfigurationItemsParameters } from './parameters/updateFieldConfigurationItemsParameters';
import type { GetAllFieldConfigurationSchemesParameters } from './parameters/getAllFieldConfigurationSchemesParameters';
import type { CreateFieldConfigurationSchemeParameters } from './parameters/createFieldConfigurationSchemeParameters';
import type { GetFieldConfigurationSchemeMappingsParameters } from './parameters/getFieldConfigurationSchemeMappingsParameters';
import type { GetFieldConfigurationSchemeProjectMappingParameters } from './parameters/getFieldConfigurationSchemeProjectMappingParameters';
import type { AssignFieldConfigurationSchemeToProjectParameters } from './parameters/assignFieldConfigurationSchemeToProjectParameters';
import type { DeleteFieldConfigurationSchemeParameters } from './parameters/deleteFieldConfigurationSchemeParameters';
import type { UpdateFieldConfigurationSchemeParameters } from './parameters/updateFieldConfigurationSchemeParameters';
import type { SetFieldConfigurationSchemeMappingParameters } from './parameters/setFieldConfigurationSchemeMappingParameters';
import type { RemoveIssueTypesFromGlobalFieldConfigurationSchemeParameters } from './parameters/removeIssueTypesFromGlobalFieldConfigurationSchemeParameters';

export class IssueFieldConfigurations {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configurations. The list can be for all field configurations or a subset determined by any combination of these
   * criteria: *
   *
   * - - A list of field configuration item IDs.
   * - - Whether the field configuration is a default.
   * - - Whether the field configuration name or description contains a query string.
   * -
   * - Only field configurations used in company-managed (classic) projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurations(parameters: GetAllFieldConfigurationsParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfiguration',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        isDefault: parameters.isDefault,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a field configuration. The field configuration is created with the same field properties as the default
   * configuration, with all the fields being optional. *
   *
   * - This operation can only create configurations for use in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfiguration(parameters: CreateFieldConfigurationParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfiguration',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a field configuration. *
   *
   * - This operation can only delete configurations used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfiguration(parameters: DeleteFieldConfigurationParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a field configuration. The name and the description provided in the request override the existing values. *
   *
   * - This operation can only update configurations used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfiguration(parameters: UpdateFieldConfigurationParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * fields for a configuration. *
   *
   * - Only the fields from configurations used in company-managed (classic) projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationItems(parameters: GetFieldConfigurationItemsParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}/fields`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates fields in a field configuration. The properties of the field configuration fields provided override the
   * existing values. *
   *
   * - This operation can only update field configurations used in company-managed (classic) projects.
   * -
   * - The operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style
   *   renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer
   *   (`autocomplete-renderer`).
   * -
   * - Hiding a field deletes it from the field configuration - deleting the required, description and renderer type
   *   values as well. As a result, hiding and unhiding will not restore the other values but use their default values.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationItems(parameters: UpdateFieldConfigurationItemsParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfiguration/${parameters.id}/fields`,
      method: 'PUT',
      body: {
        fieldConfigurationItems: parameters.fieldConfigurationItems,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes. *
   *
   * - Only field configuration schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllFieldConfigurationSchemes(parameters: GetAllFieldConfigurationSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfigurationscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a field configuration scheme. *
   *
   * - This operation can only create field configuration schemes used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldConfigurationScheme(parameters: CreateFieldConfigurationSchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfigurationscheme',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration issue type items. *
   *
   * - Only items used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeMappings(parameters: GetFieldConfigurationSchemeMappingsParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfigurationscheme/mapping',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        fieldConfigurationSchemeId: parameters.fieldConfigurationSchemeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of field
   * configuration schemes and, for each scheme, a list of the projects that use it. *
   *
   * - The list is sorted by field configuration scheme ID. The first item contains the list of project IDs assigned to
   *   the default field configuration scheme.
   * -
   * - Only field configuration schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldConfigurationSchemeProjectMapping(parameters: GetFieldConfigurationSchemeProjectMappingParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation
   * assigns the default field configuration scheme. *
   *
   * - Field configuration schemes can only be assigned to classic projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignFieldConfigurationSchemeToProject(parameters: AssignFieldConfigurationSchemeToProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/fieldconfigurationscheme/project',
      method: 'PUT',
      body: {
        fieldConfigurationSchemeId: parameters.fieldConfigurationSchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a field configuration scheme. *
   *
   * - This operation can only delete field configuration schemes used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldConfigurationScheme(parameters: DeleteFieldConfigurationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a field configuration scheme. *
   *
   * - This operation can only update field configuration schemes used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldConfigurationScheme(parameters: UpdateFieldConfigurationSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Assigns issue types to field configurations on field configuration scheme. *
   *
   * - This operation can only modify field configuration schemes used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setFieldConfigurationSchemeMapping(parameters: SetFieldConfigurationSchemeMappingParameters) {
    const request: Request = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}/mapping`,
      method: 'PUT',
      body: {
        mappings: parameters.mappings,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes issue types from the field configuration scheme. *
   *
   * - This operation can only modify field configuration schemes used in company-managed (classic) projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypesFromGlobalFieldConfigurationScheme(
    parameters: RemoveIssueTypesFromGlobalFieldConfigurationSchemeParameters,
  ) {
    const request: Request = {
      url: `/rest/api/2/fieldconfigurationscheme/${parameters.id}/mapping/delete`,
      method: 'POST',
      body: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(request);
  }
}
