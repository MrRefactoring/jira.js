import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemeProjectAssociations {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any next-gen or non-existent projects in the request are ignored and no errors are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any next-gen or non-existent projects in the request are ignored and no errors are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: never): Promise<T>;
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflowscheme/project',
      method: 'GET',
      params: {
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemeProjectAssociations.getWorkflowSchemeProjectAssociations' });
  }

  /**
   * @deprecated use 'assignSchemeToProject'
   * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async associateSchemeWithProject<T = void>(parameters: Parameters.AssociateSchemeWithProject | undefined, callback: Callback<T>): Promise<void>;
  /**
   * @deprecated use 'assignSchemeToProject'
   * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async associateSchemeWithProject<T = void>(parameters?: Parameters.AssociateSchemeWithProject, callback?: never): Promise<T>;
  async associateSchemeWithProject<T = void>(parameters?: Parameters.AssociateSchemeWithProject, callback?: Callback<T>): Promise<void | T> {
    // @ts-ignore
    return this.assignSchemeToProject(parameters, callback);
  }

  /**
   * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignSchemeToProject<T = void>(parameters: Parameters.AssignSchemeToProject | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignSchemeToProject<T = void>(parameters?: Parameters.AssignSchemeToProject, callback?: never): Promise<T>;
  async assignSchemeToProject<T = void>(parameters?: Parameters.AssignSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflowscheme/project',
      method: 'PUT',
      data: {
        workflowSchemeId: parameters?.workflowSchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemeProjectAssociations.assignSchemeToProject' });
  }
}
