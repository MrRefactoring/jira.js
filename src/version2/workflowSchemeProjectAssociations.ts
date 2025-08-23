import type { Client } from '../client';
import type { Request } from '../request';
import type { GetWorkflowSchemeProjectAssociationsParameters } from './parameters/getWorkflowSchemeProjectAssociationsParameters';
import type { AssignSchemeToProjectParameters } from './parameters/assignSchemeToProjectParameters';

export class WorkflowSchemeProjectAssociations {
  constructor(private client: Client) {}
  /**
   * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a
   * list of the requested projects associated with it. Any team-managed or non-existent projects in the request are
   * ignored and no errors are returned. *
   *
   * - If the project is associated with the `Default Workflow Scheme` no ID is returned. This is because the way the
   *   `Default Workflow Scheme` is stored means it has no ID.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeProjectAssociations(parameters: GetWorkflowSchemeProjectAssociationsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme/project',
      method: 'GET',
      query: {
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project. *
   *
   * - Workflow schemes can only be assigned to classic projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignSchemeToProject(parameters: AssignSchemeToProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme/project',
      method: 'PUT',
      body: {
        projectId: parameters.projectId,
        workflowSchemeId: parameters.workflowSchemeId,
      },
    };

    return this.client.sendRequest(request);
  }
}
