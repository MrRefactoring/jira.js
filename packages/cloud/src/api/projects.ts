import { ProjectIdentifiersSchema, type ProjectIdentifiers } from '#/models/projectIdentifiers';
import { PageProjectSchema, type PageProject } from '#/models/pageProject';
import { ProjectSchema, type Project } from '#/models/project';
import { IssueTypeWithStatusSchema, type IssueTypeWithStatus } from '#/models/issueTypeWithStatus';
import { ProjectIssueTypeHierarchySchema, type ProjectIssueTypeHierarchy } from '#/models/projectIssueTypeHierarchy';
import { NotificationSchemeSchema, type NotificationScheme } from '#/models/notificationScheme';
import { type CreateProject } from '#/parameters/createProject';
import { type SearchProjects } from '#/parameters/searchProjects';
import { type GetProject } from '#/parameters/getProject';
import { type UpdateProject } from '#/parameters/updateProject';
import { type DeleteProject } from '#/parameters/deleteProject';
import { type ArchiveProject } from '#/parameters/archiveProject';
import { type GetAllStatuses } from '#/parameters/getAllStatuses';
import { type GetHierarchy } from '#/parameters/getHierarchy';
import { type GetNotificationSchemeForProject } from '#/parameters/getNotificationSchemeForProject';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Creates a project based on a project type template, as shown in the following table:
 *
 * | Project Type Key   | Project Template Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
 * | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
 * | `business`         | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
 * | `service_desk`     | `com.atlassian.servicedesk:simplified-it-service-management`, `com.atlassian.servicedesk:simplified-external-service-desk`, `com.atlassian.servicedesk:simplified-hr-service-desk`, `com.atlassian.servicedesk:simplified-facilities-service-desk`, `com.atlassian.servicedesk:simplified-legal-service-desk`, `com.atlassian.servicedesk:simplified-analytics-service-desk`, `com.atlassian.servicedesk:simplified-marketing-service-desk`, `com.atlassian.servicedesk:simplified-design-service-desk`, `com.atlassian.servicedesk:simplified-sales-service-desk`, `com.atlassian.servicedesk:simplified-finance-service-desk`, `com.atlassian.servicedesk:company-managed-blank-service-project`, `com.atlassian.servicedesk:company-managed-general-service-project`, `com.atlassian.servicedesk:team-managed-general-service-project`, `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`, `com.atlassian.servicedesk:next-gen-legal-service-desk`, `com.atlassian.servicedesk:next-gen-marketing-service-desk`, `com.atlassian.servicedesk:next-gen-facilities-service-desk`, `com.atlassian.servicedesk:next-gen-analytics-service-desk`, `com.atlassian.servicedesk:next-gen-finance-service-desk`, `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk` |
 * | `software`         | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
 * | `customer_service` | `com.atlassian.jcs:customer-service-management`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
 *
 * The project types are available according to the installed Jira features as follows:
 *
 * - Jira Core, the default, enables `business` projects.
 * - Jira Service Management enables `service_desk` projects.
 * - Jira Software enables `software` projects.
 *
 * To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the System
 * Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** > **Apps** >
 * **Finding new apps**. For more information, see [ Managing add-ons](https://confluence.atlassian.com/x/S31NLg).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createProject(client: Client, parameters: CreateProject): Promise<ProjectIdentifiers> {
  const config: SendRequestOptions<ProjectIdentifiers> = {
    url: '/rest/api/3/project',
    method: 'POST',
    body: {
      assigneeType: parameters.assigneeType,
      avatarId: parameters.avatarId,
      categoryId: parameters.categoryId,
      description: parameters.description,
      fieldScheme: parameters.fieldScheme,
      issueSecurityScheme: parameters.issueSecurityScheme,
      issueTypeScheme: parameters.issueTypeScheme,
      issueTypeScreenScheme: parameters.issueTypeScreenScheme,
      key: parameters.key,
      leadAccountId: parameters.leadAccountId,
      name: parameters.name,
      notificationScheme: parameters.notificationScheme,
      permissionScheme: parameters.permissionScheme,
      projectTemplateKey: parameters.projectTemplateKey,
      projectTypeKey: parameters.projectTypeKey,
      url: parameters.url,
      workflowScheme: parameters.workflowScheme,
    },
    schema: ProjectIdentifiersSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of projects
 * visible to the user.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Projects
 * are returned only where the user has one of:
 *
 * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function searchProjects(client: Client, parameters?: SearchProjects): Promise<PageProject> {
  const config: SendRequestOptions<PageProject> = {
    url: '/rest/api/3/project/search',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      orderBy: parameters?.orderBy,
      id: parameters?.id,
      keys: parameters?.keys,
      query: parameters?.query,
      typeKey: parameters?.typeKey,
      categoryId: parameters?.categoryId,
      action: parameters?.action,
      expand: parameters?.expand,
      status: parameters?.status,
      properties: parameters?.properties,
      propertyQuery: parameters?.propertyQuery,
    },
    schema: PageProjectSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProject(client: Client, parameters: GetProject): Promise<Project> {
  const config: SendRequestOptions<Project> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      properties: parameters.properties,
    },
    schema: ProjectSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.
 *
 * All parameters are optional in the body of the request. Schemes will only be updated if they are included in the
 * request, any omitted schemes will be left unchanged.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). is only needed when changing the
 * schemes or project key. Otherwise you will only need _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg)
 */
export async function updateProject(client: Client, parameters: UpdateProject): Promise<Project> {
  const config: SendRequestOptions<Project> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      assigneeType: parameters.assigneeType,
      avatarId: parameters.avatarId,
      categoryId: parameters.categoryId,
      description: parameters.description,
      issueSecurityScheme: parameters.issueSecurityScheme,
      key: parameters.key,
      leadAccountId: parameters.leadAccountId,
      name: parameters.name,
      notificationScheme: parameters.notificationScheme,
      permissionScheme: parameters.permissionScheme,
      releasedProjectKeys: parameters.releasedProjectKeys,
      url: parameters.url,
    },
    schema: ProjectSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a project.
 *
 * You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it.
 * To restore a project, use the Jira UI.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteProject(client: Client, parameters: DeleteProject): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
    method: 'DELETE',
    searchParams: {
      enableUndo: parameters.enableUndo,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project
 * and then delete it. To restore a project, use the Jira UI.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function archiveProject(client: Client, parameters: ArchiveProject): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/archive`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of valid
 * issue types and each issue type has a set of valid statuses.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getAllStatuses(client: Client, parameters: GetAllStatuses): Promise<IssueTypeWithStatus[]> {
  const config: SendRequestOptions<IssueTypeWithStatus[]> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/statuses`,
    method: 'GET',
    schema: z.array(IssueTypeWithStatusSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Get the issue type hierarchy for a next-gen project.
 *
 * The issue type hierarchy for a project consists of:
 *
 * - _Epic_ at level 1 (optional).
 * - One or more issue types at level 0 such as _Story_, _Task_, or _Bug_. Where the issue type _Epic_ is defined, these
 *   issue types are used to break down the content of an epic.
 * - _Subtask_ at level -1 (optional). This issue type enables level 0 issue types to be broken down into components.
 *   Issues based on a level -1 issue type must have a parent issue.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getHierarchy(client: Client, parameters: GetHierarchy): Promise<ProjectIssueTypeHierarchy> {
  const config: SendRequestOptions<ProjectIssueTypeHierarchy> = {
    url: `/rest/api/3/project/${parameters.projectId}/hierarchy`,
    method: 'GET',
    schema: ProjectIssueTypeHierarchySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg).
 */
export async function getNotificationSchemeForProject(
  client: Client,
  parameters: GetNotificationSchemeForProject,
): Promise<NotificationScheme> {
  const config: SendRequestOptions<NotificationScheme> = {
    url: `/rest/api/3/project/${parameters.projectKeyOrId}/notificationscheme`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: NotificationSchemeSchema,
  };

  return await client.sendRequest(config);
}
