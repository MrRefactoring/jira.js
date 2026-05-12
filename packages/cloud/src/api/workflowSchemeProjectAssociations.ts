import {
  ContainerOfWorkflowSchemeAssociationsSchema,
  type ContainerOfWorkflowSchemeAssociations,
} from '#/models/containerOfWorkflowSchemeAssociations';
import { type GetWorkflowSchemeProjectAssociations } from '#/parameters/getWorkflowSchemeProjectAssociations';
import { type AssignSchemeToProject } from '#/parameters/assignSchemeToProject';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a
 * list of the requested projects associated with it. Any team-managed or non-existent projects in the request are
 * ignored and no errors are returned.
 *
 * If the project is associated with the `Default Workflow Scheme` no ID is returned. This is because the way the
 * `Default Workflow Scheme` is stored means it has no ID.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflowSchemeProjectAssociations(
  client: Client,
  parameters: GetWorkflowSchemeProjectAssociations,
): Promise<ContainerOfWorkflowSchemeAssociations> {
  const config: SendRequestOptions<ContainerOfWorkflowSchemeAssociations> = {
    url: '/rest/api/3/workflowscheme/project',
    method: 'GET',
    searchParams: {
      projectId: parameters.projectId,
    },
    schema: ContainerOfWorkflowSchemeAssociationsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
 *
 * Workflow schemes can only be assigned to classic projects.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function assignSchemeToProject(client: Client, parameters: AssignSchemeToProject): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/workflowscheme/project',
    method: 'PUT',
    body: {
      projectId: parameters.projectId,
      workflowSchemeId: parameters.workflowSchemeId,
    },
  };

  return await client.sendRequest(config);
}
