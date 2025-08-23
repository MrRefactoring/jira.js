import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveAssociationsParameters } from './parameters/removeAssociationsParameters';
import type { CreateAssociationsParameters } from './parameters/createAssociationsParameters';

export class IssueCustomFieldAssociations {
  constructor(private client: Client) {}
  /**
   * Unassociates a set of fields with a project and issue type context. *
   *
   * - Fields will be unassociated with all projects/issue types that share the same field configuration which the
   *   provided project and issue types are using. This means that while the field will be unassociated with the
   *   provided project and issue types, it will also be unassociated with any other projects and issue types that share
   *   the same field configuration.
   * -
   * - If a success response is returned it means that the field association has been removed in any applicable contexts
   *   where it was present.
   * -
   * - Up to 50 fields and up to 100 projects and issue types can be unassociated in a single request. If more fields or
   *   projects are provided a 400 response will be returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAssociations(parameters: RemoveAssociationsParameters) {
    const request: Request = {
      url: '/rest/api/2/field/association',
      method: 'DELETE',
      body: {
        associationContexts: parameters.associationContexts,
        fields: parameters.fields,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Associates fields with projects. *
   *
   * - Fields will be associated with each issue type on the requested projects.
   * -
   * - Fields will be associated with all projects that share the same field configuration which the provided projects are
   *   using. This means that while the field will be associated with the requested projects, it will also be associated
   *   with any other projects that share the same field configuration.
   * -
   * - If a success response is returned it means that the field association has been created in any applicable contexts
   *   where it wasn't already present.
   * -
   * - Up to 50 fields and up to 100 projects can be associated in a single request. If more fields or projects are
   *   provided a 400 response will be returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createAssociations(parameters: CreateAssociationsParameters) {
    const request: Request = {
      url: '/rest/api/2/field/association',
      method: 'PUT',
      body: {
        associationContexts: parameters.associationContexts,
        fields: parameters.fields,
      },
    };

    return this.client.sendRequest(request);
  }
}
