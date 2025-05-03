import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueCustomFieldAssociations {
  constructor(private client: Client) {}

  /**
   * @experimental
   * Associates fields with projects.
   *
   * Fields will be associated with each issue type on the requested projects.
   *
   * Fields will be associated with all projects that share the same field configuration which the provided projects are
   * using. This means that while the field will be associated with the requested projects, it will also be associated
   * with any other projects that share the same field configuration.
   *
   * If a success response is returned it means that the field association has been created in any applicable contexts
   * where it wasn't already present.
   *
   * Up to 50 fields and up to 100 projects can be associated in a single request. If more fields or projects are
   * provided a 400 response will be returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createAssociations<T = void>(parameters: Parameters.CreateAssociations, callback: Callback<T>): Promise<void>;
  /**
   * @experimental
   * Associates fields with projects.
   *
   * Fields will be associated with each issue type on the requested projects.
   *
   * Fields will be associated with all projects that share the same field configuration which the provided projects are
   * using. This means that while the field will be associated with the requested projects, it will also be associated
   * with any other projects that share the same field configuration.
   *
   * If a success response is returned it means that the field association has been created in any applicable contexts
   * where it wasn't already present.
   *
   * Up to 50 fields and up to 100 projects can be associated in a single request. If more fields or projects are
   * provided a 400 response will be returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createAssociations<T = void>(parameters: Parameters.CreateAssociations, callback?: never): Promise<T>;
  async createAssociations<T = void>(
    parameters: Parameters.CreateAssociations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/field/association',
      method: 'PUT',
      data: {
        associationContexts: parameters.associationContexts,
        fields: parameters.fields,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   * Unassociates a set of fields with a project and issue type context.
   *
   * Fields will be unassociated with all projects/issue types that share the same field configuration which the
   * provided project and issue types are using. This means that while the field will be unassociated with the provided
   * project and issue types, it will also be unassociated with any other projects and issue types that share the same
   * field configuration.
   *
   * If a success response is returned it means that the field association has been removed in any applicable contexts
   * where it was present.
   *
   * Up to 50 fields and up to 100 projects and issue types can be unassociated in a single request. If more fields or
   * projects are provided a 400 response will be returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAssociations<T = void>(parameters: Parameters.RemoveAssociations, callback: Callback<T>): Promise<void>;
  /**
   * @experimental
   * Unassociates a set of fields with a project and issue type context.
   *
   * Fields will be unassociated with all projects/issue types that share the same field configuration which the
   * provided project and issue types are using. This means that while the field will be unassociated with the provided
   * project and issue types, it will also be unassociated with any other projects and issue types that share the same
   * field configuration.
   *
   * If a success response is returned it means that the field association has been removed in any applicable contexts
   * where it was present.
   *
   * Up to 50 fields and up to 100 projects and issue types can be unassociated in a single request. If more fields or
   * projects are provided a 400 response will be returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAssociations<T = void>(parameters: Parameters.RemoveAssociations, callback?: never): Promise<T>;
  async removeAssociations<T = void>(
    parameters: Parameters.RemoveAssociations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/field/association',
      method: 'DELETE',
      data: {
        associationContexts: parameters.associationContexts,
        fields: parameters.fields,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
