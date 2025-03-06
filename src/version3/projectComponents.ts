import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';
import type { Paginated } from '../paginated';

export class ProjectComponents {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project, including global (Compass) components when applicable.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async findComponentsForProjects<T = Paginated<Models.Component>>(
    parameters: Parameters.FindComponentsForProjects,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project, including global (Compass) components when applicable.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async findComponentsForProjects<T = Paginated<Models.Component>>(
    parameters: Parameters.FindComponentsForProjects,
    callback?: never,
  ): Promise<T>;
  async findComponentsForProjects<T = Paginated<Models.Component>>(
    parameters: Parameters.FindComponentsForProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/component',
      method: 'GET',
      params: {
        projectIdsOrKeys: parameters.projectIdsOrKeys,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a component. Use components to provide containers for issues within a project. Use components to provide
   * containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a component. Use components to provide containers for issues within a project. Use components to provide
   * containers for issues within a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
   * component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback?: never,
  ): Promise<T>;
  async createComponent<T = Models.ProjectComponent>(
    parameters: Parameters.CreateComponent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/component',
      method: 'POST',
      data: {
        ari: parameters.ari,
        assignee: parameters.assignee,
        assigneeType: parameters.assigneeType,
        description: parameters.description,
        id: parameters.id,
        isAssigneeTypeValid: parameters.isAssigneeTypeValid,
        lead: parameters.lead,
        leadAccountId: parameters.leadAccountId,
        leadUserName: parameters.leadUserName,
        metadata: parameters.metadata,
        name: parameters.name,
        project: parameters.project,
        projectId: parameters.projectId,
        realAssignee: parameters.realAssignee,
        realAssigneeType: parameters.realAssigneeType,
        self: parameters.self,
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
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a component.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
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
    callback: Callback<T>,
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
    callback?: never,
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
   * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.
   *
   * - **Classic**: `read:jira-work`
   * - **Granular**: `read:field:jira`, `read:project.component:jira`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(
    parameters: Parameters.GetComponentRelatedIssues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the counts of issues assigned to the component.
   *
   * This operation can be accessed anonymously.
   *
   * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.
   *
   * - **Classic**: `read:jira-work`
   * - **Granular**: `read:field:jira`, `read:project.component:jira`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(
    parameters: Parameters.GetComponentRelatedIssues,
    callback?: never,
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
   * If your project uses Compass components, this API will return a list of Compass components that are linked to
   * issues in that project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * components in a project. See the [Get project components](#api-rest-api-3-project-projectIdOrKey-components-get)
   * resource if you want to get a full list of versions without pagination.
   *
   * If your project uses Compass components, this API will return a list of Compass components that are linked to
   * issues in that project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated<T = Models.PageComponentWithIssueCount>(
    parameters: Parameters.GetProjectComponentsPaginated,
    callback?: never,
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
        componentSource: parameters.componentSource,
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
   * If your project uses Compass components, this API will return a paginated list of Compass components that are
   * linked to issues in that project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all components in a project. See the [Get project components
   * paginated](#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of
   * components with pagination.
   *
   * If your project uses Compass components, this API will return a paginated list of Compass components that are
   * linked to issues in that project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: never,
  ): Promise<T>;
  async getProjectComponents<T = Models.ProjectComponent[]>(
    parameters: Parameters.GetProjectComponents,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
      params: {
        componentSource: parameters.componentSource,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
