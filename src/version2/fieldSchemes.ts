import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class FieldSchemes {
  constructor(private client: Client) {}

  /**
   * @experimental
   *
   * REST endpoint for retrieving a paginated list of field association schemes with optional filtering.
   *
   * This endpoint allows clients to fetch field association schemes with optional filtering by project IDs and text
   * queries. The response includes scheme details with navigation links and filter metadata when applicable.
   *
   * Filtering Behavior:
   *
   * - When projectId or query parameters are provided, the response includes matchedFilters metadata showing which
   *   filters were applied.
   * - When no filters are applied, matchedFilters is omitted from individual scheme objects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemes<T = Models.GetFieldAssociationSchemeResponsePage>(
    parameters: Parameters.GetFieldAssociationSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * REST endpoint for retrieving a paginated list of field association schemes with optional filtering.
   *
   * This endpoint allows clients to fetch field association schemes with optional filtering by project IDs and text
   * queries. The response includes scheme details with navigation links and filter metadata when applicable.
   *
   * Filtering Behavior:
   *
   * - When projectId or query parameters are provided, the response includes matchedFilters metadata showing which
   *   filters were applied.
   * - When no filters are applied, matchedFilters is omitted from individual scheme objects
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemes<T = Models.GetFieldAssociationSchemeResponsePage>(
    parameters?: Parameters.GetFieldAssociationSchemes,
    callback?: never,
  ): Promise<T>;
  async getFieldAssociationSchemes<T = Models.GetFieldAssociationSchemeResponsePage>(
    parameters?: Parameters.GetFieldAssociationSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes',
      method: 'GET',
      params: {
        projectId: parameters?.projectId,
        query: parameters?.query,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Endpoint for creating a new field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldAssociationScheme<T = Models.CreateFieldAssociationSchemeResponse>(
    parameters: Parameters.CreateFieldAssociationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Endpoint for creating a new field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createFieldAssociationScheme<T = Models.CreateFieldAssociationSchemeResponse>(
    parameters: Parameters.CreateFieldAssociationScheme,
    callback?: never,
  ): Promise<T>;
  async createFieldAssociationScheme<T = Models.CreateFieldAssociationSchemeResponse>(
    parameters: Parameters.CreateFieldAssociationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes',
      method: 'POST',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Update fields associated with field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.UpdateFieldAssociationsRequestItem[],
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Update fields associated with field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.UpdateFieldAssociationsRequestItem[],
    callback?: never,
  ): Promise<T>;
  async updateFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.UpdateFieldAssociationsRequestItem[],
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/fields',
      method: 'PUT',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Remove fields associated with field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.RemoveFieldAssociationsRequestItem,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Remove fields associated with field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.RemoveFieldAssociationsRequestItem,
    callback?: never,
  ): Promise<T>;
  async removeFieldsAssociatedWithSchemes<T = void>(
    parameters: Parameters.RemoveFieldAssociationsRequestItem,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/fields',
      method: 'DELETE',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Update field association item parameters in field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.UpdateFieldSchemeParametersRequest[],
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Update field association item parameters in field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.UpdateFieldSchemeParametersRequest[],
    callback?: never,
  ): Promise<T>;
  async updateFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.UpdateFieldSchemeParametersRequest[],
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/fields/parameters',
      method: 'PUT',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Remove field association parameters overrides for work types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.ParameterRemovalDetails[],
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Remove field association parameters overrides for work types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.ParameterRemovalDetails[],
    callback?: never,
  ): Promise<T>;
  async removeFieldAssociationSchemeItemParameters<T = void>(
    parameters: Parameters.ParameterRemovalDetails[],
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/fields/parameters',
      method: 'DELETE',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Get projects with field association schemes. This will be a temporary API but useful when transitioning from the
   * legacy field configuration APIs to the new ones.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectsWithFieldSchemes<T = Models.GetProjectsWithFieldSchemesResponsePage>(
    parameters: Parameters.GetProjectsWithFieldSchemes,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Get projects with field association schemes. This will be a temporary API but useful when transitioning from the
   * legacy field configuration APIs to the new ones.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectsWithFieldSchemes<T = Models.GetProjectsWithFieldSchemesResponsePage>(
    parameters: Parameters.GetProjectsWithFieldSchemes,
    callback?: never,
  ): Promise<T>;
  async getProjectsWithFieldSchemes<T = Models.GetProjectsWithFieldSchemesResponsePage>(
    parameters: Parameters.GetProjectsWithFieldSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/projects',
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
   * @experimental
   *
   * Associate projects to field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async associateProjectsToFieldAssociationSchemes<T = void>(
    parameters: Parameters.FieldSchemeToProjectsRequest,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Associate projects to field association schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async associateProjectsToFieldAssociationSchemes<T = void>(
    parameters: Parameters.FieldSchemeToProjectsRequest,
    callback?: never,
  ): Promise<T>;
  async associateProjectsToFieldAssociationSchemes<T = void>(
    parameters: Parameters.FieldSchemeToProjectsRequest,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/config/fieldschemes/projects',
      method: 'PUT',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Endpoint for fetching a field association scheme by its ID
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemeById<T = Models.GetFieldAssociationSchemeByIdResponse>(
    parameters: Parameters.GetFieldAssociationSchemeById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Endpoint for fetching a field association scheme by its ID
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemeById<T = Models.GetFieldAssociationSchemeByIdResponse>(
    parameters: Parameters.GetFieldAssociationSchemeById,
    callback?: never,
  ): Promise<T>;
  async getFieldAssociationSchemeById<T = Models.GetFieldAssociationSchemeByIdResponse>(
    parameters: Parameters.GetFieldAssociationSchemeById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Endpoint for updating an existing field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldAssociationScheme<T = Models.UpdateFieldAssociationSchemeResponse>(
    parameters: Parameters.UpdateFieldAssociationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Endpoint for updating an existing field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateFieldAssociationScheme<T = Models.UpdateFieldAssociationSchemeResponse>(
    parameters: Parameters.UpdateFieldAssociationScheme,
    callback?: never,
  ): Promise<T>;
  async updateFieldAssociationScheme<T = Models.UpdateFieldAssociationSchemeResponse>(
    parameters: Parameters.UpdateFieldAssociationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Delete a specified field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldAssociationScheme<T = Models.DeleteFieldAssociationSchemeResponse>(
    parameters: Parameters.DeleteFieldAssociationScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Delete a specified field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFieldAssociationScheme<T = Models.DeleteFieldAssociationSchemeResponse>(
    parameters: Parameters.DeleteFieldAssociationScheme,
    callback?: never,
  ): Promise<T>;
  async deleteFieldAssociationScheme<T = Models.DeleteFieldAssociationSchemeResponse>(
    parameters: Parameters.DeleteFieldAssociationScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Search for fields belonging to a given field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchFieldAssociationSchemeFields<T = Models.FieldAssociationSchemeFieldSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeFields,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Search for fields belonging to a given field association scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchFieldAssociationSchemeFields<T = Models.FieldAssociationSchemeFieldSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeFields,
    callback?: never,
  ): Promise<T>;
  async searchFieldAssociationSchemeFields<T = Models.FieldAssociationSchemeFieldSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeFields,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}/fields`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        fieldId: parameters.fieldId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Retrieve field association parameters on a field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemeItemParameters<T = Models.GetFieldAssociationParametersResponse>(
    parameters: Parameters.GetFieldAssociationSchemeItemParameters,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Retrieve field association parameters on a field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getFieldAssociationSchemeItemParameters<T = Models.GetFieldAssociationParametersResponse>(
    parameters: Parameters.GetFieldAssociationSchemeItemParameters,
    callback?: never,
  ): Promise<T>;
  async getFieldAssociationSchemeItemParameters<T = Models.GetFieldAssociationParametersResponse>(
    parameters: Parameters.GetFieldAssociationSchemeItemParameters,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}/fields/${parameters.fieldId}/parameters`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * REST Endpoint for searching for projects belonging to a given field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchFieldAssociationSchemeProjects<T = Models.FieldAssociationSchemeProjectSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeProjects,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * REST Endpoint for searching for projects belonging to a given field association scheme
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchFieldAssociationSchemeProjects<T = Models.FieldAssociationSchemeProjectSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeProjects,
    callback?: never,
  ): Promise<T>;
  async searchFieldAssociationSchemeProjects<T = Models.FieldAssociationSchemeProjectSearchResultPage>(
    parameters: Parameters.SearchFieldAssociationSchemeProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/config/fieldschemes/${parameters.id}/projects`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
