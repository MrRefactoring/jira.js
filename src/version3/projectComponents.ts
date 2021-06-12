import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectComponents {
  constructor(private client: Client) {}

  /**
   * Creates a component. Use components to provide containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.Component>(
    parameters: Parameters.CreateComponent | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a component. Use components to provide containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.Component>(parameters?: Parameters.CreateComponent, callback?: never): Promise<T>;
  async createComponent<T = Models.Component>(
    parameters?: Parameters.CreateComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/component',
      method: 'POST',
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
        lead: parameters?.lead,
        leadUserName: parameters?.leadUserName,
        leadAccountId: parameters?.leadAccountId,
        assigneeType: parameters?.assigneeType,
        assignee: parameters?.assignee,
        realAssigneeType: parameters?.realAssigneeType,
        realAssignee: parameters?.realAssignee,
        isAssigneeTypeValid: parameters?.isAssigneeTypeValid,
        project: parameters?.project,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectComponents.createComponent' });
  }

  /**
   * Returns a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
   */
  async getComponent<T = Models.Component>(parameters: Parameters.GetComponent, callback: Callback<T>): Promise<void>;
  /**
   * Returns a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
   */
  async getComponent<T = Models.Component>(parameters: Parameters.GetComponent, callback?: never): Promise<T>;
  async getComponent<T = Models.Component>(
    parameters: Parameters.GetComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectComponents.getComponent' });
  }

  /**
   * Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("")
   * the component lead is removed.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateComponent<T = Models.Component>(
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
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateComponent<T = Models.Component>(parameters: Parameters.UpdateComponent, callback?: never): Promise<T>;
  async updateComponent<T = Models.Component>(
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectComponents.updateComponent' });
  }

  /**
   * Deletes a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   * the component or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectComponents.deleteComponent' });
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

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectComponents.getComponentRelatedIssues',
    });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project. See the [Get project components](#api-rest-api-3-project-projectIdOrKey-components-get)
   * resource if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback?: never
  ): Promise<T>;
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(
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

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.projectComponents.getProjectComponentsPaginated',
    });
  }

  /**
   * Returns all components in a project. See the [Get project components
   * paginated](#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of
   * components with pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.Component[]>(
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.Component[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: never
  ): Promise<T>;
  async getProjectComponents<T = Models.Component[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectComponents.getProjectComponents' });
  }
}
