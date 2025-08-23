import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateProjectParameters } from './parameters/createProjectParameters';
import type { GetRecentParameters } from './parameters/getRecentParameters';
import type { SearchProjectsParameters } from './parameters/searchProjectsParameters';
import type { DeleteProjectParameters } from './parameters/deleteProjectParameters';
import type { GetProjectParameters } from './parameters/getProjectParameters';
import type { UpdateProjectParameters } from './parameters/updateProjectParameters';
import type { ArchiveProjectParameters } from './parameters/archiveProjectParameters';
import type { DeleteProjectAsynchronouslyParameters } from './parameters/deleteProjectAsynchronouslyParameters';
import type { RestoreParameters } from './parameters/restoreParameters';
import type { GetAllStatusesParameters } from './parameters/getAllStatusesParameters';
import type { GetHierarchyParameters } from './parameters/getHierarchyParameters';
import type { GetNotificationSchemeForProjectParameters } from './parameters/getNotificationSchemeForProjectParameters';

export class Projects {
  constructor(private client: Client) {}
  /**
   * Creates a project based on a project type template, as shown in the following table: *
   *
   * - | Project Type Key | Project Template Key |
   * - |--|--|
   * - | `business` | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`,
   *   `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |
   * - | `service_desk` | `com.atlassian.servicedesk:simplified-it-service-management`,
   *   `com.atlassian.servicedesk:simplified-general-service-desk-it`,
   *   `com.atlassian.servicedesk:simplified-general-service-desk-business`,
   *   `com.atlassian.servicedesk:simplified-external-service-desk`,
   *   `com.atlassian.servicedesk:simplified-hr-service-desk`,
   *   `com.atlassian.servicedesk:simplified-facilities-service-desk`,
   *   `com.atlassian.servicedesk:simplified-legal-service-desk`,
   *   `com.atlassian.servicedesk:simplified-analytics-service-desk`,
   *   `com.atlassian.servicedesk:simplified-marketing-service-desk`,
   *   `com.atlassian.servicedesk:simplified-design-service-desk`,
   *   `com.atlassian.servicedesk:simplified-sales-service-desk`,
   *   `com.atlassian.servicedesk:simplified-blank-project-business`,
   *   `com.atlassian.servicedesk:simplified-blank-project-it`,
   *   `com.atlassian.servicedesk:simplified-finance-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-legal-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-marketing-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-facilities-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-general-it-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-general-business-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-analytics-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-finance-service-desk`,
   *   `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk`
   *   |
   * - | `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`,
   *   `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`,
   *   `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`,
   *   `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |
   * - The project types are available according to the installed Jira features as follows:
   * -
   * - - Jira Core, the default, enables `business` projects.
   * - - Jira Service Management enables `service_desk` projects.
   * - - Jira Software enables `software` projects.
   * -
   * - To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the
   *   System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** >
   *   **Apps** > **Finding new apps**. For more information, see [ Managing
   *   add-ons](https://confluence.atlassian.com/x/S31NLg).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProject(parameters: CreateProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/project',
      method: 'POST',
      body: {
        assigneeType: parameters.assigneeType,
        avatarId: parameters.avatarId,
        categoryId: parameters.categoryId,
        description: parameters.description,
        fieldConfigurationScheme: parameters.fieldConfigurationScheme,
        issueSecurityScheme: parameters.issueSecurityScheme,
        issueTypeScheme: parameters.issueTypeScheme,
        issueTypeScreenScheme: parameters.issueTypeScreenScheme,
        key: parameters.key,
        lead: parameters.lead,
        leadAccountId: parameters.leadAccountId,
        name: parameters.name,
        notificationScheme: parameters.notificationScheme,
        permissionScheme: parameters.permissionScheme,
        projectTemplateKey: parameters.projectTemplateKey,
        projectTypeKey: parameters.projectTypeKey,
        url: parameters.url,
        workflowScheme: parameters.workflowScheme,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of up to 20 projects recently viewed by the user that are still visible to the user. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Projects are returned only where the user has one of:
   * -
   * - - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getRecent(parameters: GetRecentParameters) {
    const request: Request = {
      url: '/rest/api/2/project/recent',
      method: 'GET',
      query: {
        expand: parameters.expand,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects visible to the user. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Projects are returned only where the user has one of:
   * -
   * - - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjects(parameters: SearchProjectsParameters) {
    const request: Request = {
      url: '/rest/api/2/project/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        id: parameters.id,
        keys: parameters.keys,
        query: parameters.query,
        typeKey: parameters.typeKey,
        categoryId: parameters.categoryId,
        action: parameters.action,
        expand: parameters.expand,
        status: parameters.status,
        properties: parameters.properties,
        propertyQuery: parameters.propertyQuery,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a project. *
   *
   * - You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it.
   *   To restore a project, use the Jira UI.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProject(parameters: DeleteProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
      method: 'DELETE',
      query: {
        enableUndo: parameters.enableUndo,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProject(parameters: GetProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project. *
   *
   * - All parameters are optional in the body of the request. Schemes will only be updated if they are included in the
   *   request, any omitted schemes will be left unchanged.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). is only needed when changing
   *   the schemes or project key. Otherwise you will only need _Administer Projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateProject(parameters: UpdateProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
      method: 'PUT',
      query: {
        expand: parameters.expand,
      },
      body: {
        assigneeType: parameters.assigneeType,
        avatarId: parameters.avatarId,
        categoryId: parameters.categoryId,
        description: parameters.description,
        issueSecurityScheme: parameters.issueSecurityScheme,
        key: parameters.key,
        lead: parameters.lead,
        leadAccountId: parameters.leadAccountId,
        name: parameters.name,
        notificationScheme: parameters.notificationScheme,
        permissionScheme: parameters.permissionScheme,
        releasedProjectKeys: parameters.releasedProjectKeys,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project
   * and then delete it. To restore a project, use the Jira UI. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archiveProject(parameters: ArchiveProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/archive`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a project asynchronously. *
   *
   * - This operation is:
   * -
   * - - Transactional, that is, if part of the delete fails the project is not deleted.
   * - - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *       `location` link in the response to determine the status of the task and use [Get
   *       task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectAsynchronously(parameters: DeleteProjectAsynchronouslyParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/delete`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Restores a project that has been archived or placed in the Jira recycle bin. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)for Company managed projects.
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for the project for Team managed projects.
   */
  async restore(parameters: RestoreParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of
   * valid issue types and each issue type has a set of valid statuses. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllStatuses(parameters: GetAllStatusesParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/statuses`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Get the issue type hierarchy for a next-gen project. *
   *
   * - The issue type hierarchy for a project consists of:
   * -
   * - - _Epic_ at level 1 (optional).
   * - - One or more issue types at level 0 such as _Story_, _Task_, or _Bug_. Where the issue type _Epic_ is defined, these
   *       issue types are used to break down the content of an epic.
   * - - _Subtask_ at level -1 (optional). This issue type enables level 0 issue types to be broken down into components.
   *       Issues based on a level -1 issue type must have a parent issue.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getHierarchy(parameters: GetHierarchyParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectId}/hierarchy`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getNotificationSchemeForProject(parameters: GetNotificationSchemeForProjectParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectKeyOrId}/notificationscheme`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }
}
