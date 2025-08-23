import type { Client } from '../client';
import type { Request } from '../request';
import type { FindComponentsForProjectsParameters } from './parameters/findComponentsForProjectsParameters';
import type { CreateComponentParameters } from './parameters/createComponentParameters';
import type { DeleteComponentParameters } from './parameters/deleteComponentParameters';
import type { GetComponentParameters } from './parameters/getComponentParameters';
import type { UpdateComponentParameters } from './parameters/updateComponentParameters';
import type { GetComponentRelatedIssuesParameters } from './parameters/getComponentRelatedIssuesParameters';
import type { GetProjectComponentsPaginatedParameters } from './parameters/getProjectComponentsPaginatedParameters';
import type { GetProjectComponentsParameters } from './parameters/getProjectComponentsParameters';

export class ProjectComponents {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * components in a project, including global (Compass) components when applicable. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async findComponentsForProjects(parameters: FindComponentsForProjectsParameters) {
    const request: Request = {
      url: '/rest/api/2/component',
      method: 'GET',
      query: {
        projectIdsOrKeys: parameters.projectIdsOrKeys,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a component. Use components to provide containers for issues within a project. Use components to provide
   * containers for issues within a project. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which
   *   the component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createComponent(parameters: CreateComponentParameters) {
    const request: Request = {
      url: '/rest/api/2/component',
      method: 'POST',
      body: {
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

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a component. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   *   the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteComponent(parameters: DeleteComponentParameters) {
    const request: Request = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'DELETE',
      query: {
        moveIssuesTo: parameters.moveIssuesTo,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a component. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
   */
  async getComponent(parameters: GetComponentParameters) {
    const request: Request = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("")
   * the component lead is removed. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing
   *   the component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateComponent(parameters: UpdateComponentParameters) {
    const request: Request = {
      url: `/rest/api/2/component/${parameters.id}`,
      method: 'PUT',
      body: {
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

    return this.client.sendRequest(request);
  }

  /**
   * Returns the counts of issues assigned to the component. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.
   * -
   * - - **Classic**: `read:jira-work`
   * - - **Granular**: `read:field:jira`, `read:project.component:jira`
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getComponentRelatedIssues(parameters: GetComponentRelatedIssuesParameters) {
    const request: Request = {
      url: `/rest/api/2/component/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * components in a project. See the [Get project components](#api-rest-api-2-project-projectIdOrKey-components-get)
   * resource if you want to get a full list of versions without pagination. *
   *
   * - If your project uses Compass components, this API will return a list of Compass components that are linked to
   *   issues in that project.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponentsPaginated(parameters: GetProjectComponentsPaginatedParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/component`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        componentSource: parameters.componentSource,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all components in a project. See the [Get project components
   * paginated](#api-rest-api-2-project-projectIdOrKey-component-get) resource if you want to get a full list of
   * components with pagination. *
   *
   * - If your project uses Compass components, this API will return a paginated list of Compass components that are
   *   linked to issues in that project.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectComponents(parameters: GetProjectComponentsParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
      query: {
        componentSource: parameters.componentSource,
      },
    };

    return this.client.sendRequest(request);
  }
}
