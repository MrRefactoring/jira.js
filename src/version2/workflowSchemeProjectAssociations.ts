import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemeProjectAssociations {
  constructor(private client: Client) { }
  /**
     * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any next-gen or non-existent projects in the request are ignored and no errors are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
  /**
     * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any next-gen or non-existent projects in the request are ignored and no errors are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: undefined): Promise<T>;
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflowscheme/project',
      method: 'GET',
      params: {
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getWorkflowSchemeProjectAssociations' });
  }
  /**
     * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
     *
     * Workflow schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async associateSchemeWithProject<T = void>(parameters?: Parameters.AssociateSchemeWithProject, callback?: Callback<T>): Promise<void>;
  /**
     * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
     *
     * Workflow schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async associateSchemeWithProject<T = void>(parameters?: Parameters.AssociateSchemeWithProject, callback?: undefined): Promise<T>;
  async associateSchemeWithProject<T = void>(parameters?: Parameters.AssociateSchemeWithProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflowscheme/project',
      method: 'PUT',
      data: {
        workflowSchemeId: parameters?.workflowSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'associateSchemeWithProject' });
  }
}
