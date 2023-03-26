import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ProjectComponents {
  constructor(private client: Client) {}

  /**
   * Creates a component. Use components to provide containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a component. Use components to provide containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback?: never
  ): Promise<T>;
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/component',
      method: 'POST',
      data: {
        assignee: parameters?.assignee,
        assigneeType: parameters?.assigneeType,
        description: parameters?.description,
        id: parameters?.id,
        isAssigneeTypeValid: parameters?.isAssigneeTypeValid,
        lead: parameters?.lead,
        leadAccountId: parameters?.leadAccountId,
        leadUserName: parameters?.leadUserName,
        name: parameters?.name,
        project: parameters?.project,
        projectId: parameters?.projectId,
        realAssignee: parameters?.realAssignee,
        realAssigneeType: parameters?.realAssigneeType,
        self: parameters?.self,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
   */
  async getComponent<T = Models.ProjectComponent>(
    parameters: Parameters.GetComponent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](#permissions) required:** _Browse projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
   */
  async getComponent<T = Models.ProjectComponent>(parameters: Parameters.GetComponent, callback?: never): Promise<T>;
  async getComponent<T = Models.ProjectComponent>(
    parameters: Parameters.GetComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("")
   * the component lead is removed.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateComponent<T = Models.ProjectComponent>(
    parameters: Parameters.UpdateComponent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("")
   * the component lead is removed.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateComponent<T = Models.ProjectComponent>(
    parameters: Parameters.UpdateComponent,
    callback?: never
  ): Promise<T>;
  async updateComponent<T = Models.ProjectComponent>(
    parameters: Parameters.UpdateComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        leadUserName: parameters.leadUserName,
        leadAccountId: parameters.leadAccountId,
        assigneeType: parameters.assigneeType,
        project: parameters.project,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback?: never): Promise<T>;
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'DELETE',
      params: {
        moveIssuesTo: parameters.moveIssuesTo,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the counts of issues assigned to the component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(
    parameters: Parameters.GetComponentRelatedIssues,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the counts of issues assigned to the component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(
    parameters: Parameters.GetComponentRelatedIssues,
    callback?: never
  ): Promise<T>;
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(
    parameters: Parameters.GetComponentRelatedIssues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/component/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project. See the [Get project components](#api-rest-api-3-project-projectIdOrKey-components-get)
   * resource if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project. See the [Get project components](#api-rest-api-3-project-projectIdOrKey-components-get)
   * resource if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback?: never
  ): Promise<T>;
  async getProjectComponentsPaginated<T = Models.PageComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/component`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all components in a project. See the [Get project components
   * paginated](#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of
   * components with pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all components in a project. See the [Get project components
   * paginated](#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of
   * components with pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: never
  ): Promise<T>;
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
