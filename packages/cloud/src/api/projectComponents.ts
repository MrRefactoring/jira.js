import { Page2ComponentJsonSchema, type Page2ComponentJson } from '#/models/page2ComponentJson';
import { ProjectComponentSchema, type ProjectComponent } from '#/models/projectComponent';
import { ComponentIssuesCountSchema, type ComponentIssuesCount } from '#/models/componentIssuesCount';
import {
  PageComponentWithIssueCountSchema,
  type PageComponentWithIssueCount,
} from '#/models/pageComponentWithIssueCount';
import { type FindComponentsForProjects } from '#/parameters/findComponentsForProjects';
import { type CreateComponent } from '#/parameters/createComponent';
import { type GetComponent } from '#/parameters/getComponent';
import { type UpdateComponent } from '#/parameters/updateComponent';
import { type DeleteComponent } from '#/parameters/deleteComponent';
import { type GetComponentRelatedIssues } from '#/parameters/getComponentRelatedIssues';
import { type GetProjectComponentsPaginated } from '#/parameters/getProjectComponentsPaginated';
import { type GetProjectComponents } from '#/parameters/getProjectComponents';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * components in a project, including global (Compass) components when applicable.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function findComponentsForProjects(
  client: Client,
  parameters?: FindComponentsForProjects,
): Promise<Page2ComponentJson> {
  const config: SendRequestOptions<Page2ComponentJson> = {
    url: '/rest/api/3/component',
    method: 'GET',
    searchParams: {
      projectIdsOrKeys: parameters?.projectIdsOrKeys,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      orderBy: parameters?.orderBy,
      query: parameters?.query,
    },
    schema: Page2ComponentJsonSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a component. Use components to provide containers for issues within a project. Use components to provide
 * containers for issues within a project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the
 * component is created or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createComponent(client: Client, parameters: CreateComponent): Promise<ProjectComponent> {
  const config: SendRequestOptions<ProjectComponent> = {
    url: '/rest/api/3/component',
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
      metadata: parameters.metadata,
      name: parameters.name,
      project: parameters.project,
      projectId: parameters.projectId,
      realAssignee: parameters.realAssignee,
      realAssigneeType: parameters.realAssigneeType,
      self: parameters.self,
    },
    schema: ProjectComponentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a component.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for project containing the component.
 */
export async function getComponent(client: Client, parameters: GetComponent): Promise<ProjectComponent> {
  const config: SendRequestOptions<ProjectComponent> = {
    url: `/rest/api/3/component/${parameters.id}`,
    method: 'GET',
    schema: ProjectComponentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("")
 * the component lead is removed.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 * component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateComponent(client: Client, parameters: UpdateComponent): Promise<ProjectComponent> {
  const config: SendRequestOptions<ProjectComponent> = {
    url: `/rest/api/3/component/${parameters.id}`,
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
      metadata: parameters.metadata,
      name: parameters.name,
      project: parameters.project,
      projectId: parameters.projectId,
      realAssignee: parameters.realAssignee,
      realAssigneeType: parameters.realAssigneeType,
      self: parameters.self,
    },
    schema: ProjectComponentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a component.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
 * component or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteComponent(client: Client, parameters: DeleteComponent): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/component/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      moveIssuesTo: parameters.moveIssuesTo,
    },
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getComponentRelatedIssues(
  client: Client,
  parameters: GetComponentRelatedIssues,
): Promise<ComponentIssuesCount> {
  const config: SendRequestOptions<ComponentIssuesCount> = {
    url: `/rest/api/3/component/${parameters.id}/relatedIssueCounts`,
    method: 'GET',
    schema: ComponentIssuesCountSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * components in a project. See the [Get project
 * components](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-components-get)
 * resource if you want to get a full list of versions without pagination.
 *
 * If your project uses Compass components, this API will return a list of Compass components that are linked to issues
 * in that project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectComponentsPaginated(
  client: Client,
  parameters: GetProjectComponentsPaginated,
): Promise<PageComponentWithIssueCount> {
  const config: SendRequestOptions<PageComponentWithIssueCount> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/component`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      orderBy: parameters.orderBy,
      componentSource: parameters.componentSource,
      query: parameters.query,
    },
    schema: PageComponentWithIssueCountSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all components in a project. See the [Get project components
 * paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-component-get)
 * resource if you want to get a full list of components with pagination.
 *
 * If your project uses Compass components, this API will return a paginated list of Compass components that are linked
 * to issues in that project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectComponents(
  client: Client,
  parameters: GetProjectComponents,
): Promise<ProjectComponent[]> {
  const config: SendRequestOptions<ProjectComponent[]> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/components`,
    method: 'GET',
    searchParams: {
      componentSource: parameters.componentSource,
    },
    schema: z.array(ProjectComponentSchema),
  };

  return await client.sendRequest(config);
}
