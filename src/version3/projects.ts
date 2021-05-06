import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Projects {
  constructor(private client: Client) {
  }

  /**
   * Returns all projects visible to the user. Deprecated, use [ Get projects paginated](#api-rest-api-3-project-search-get) that supports search and pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Projects are returned only where the user has *Browse Projects* or *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllProjects<T = Models.Project[]>(parameters: Parameters.GetAllProjects | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns all projects visible to the user. Deprecated, use [ Get projects paginated](#api-rest-api-3-project-search-get) that supports search and pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Projects are returned only where the user has *Browse Projects* or *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllProjects<T = Models.Project[]>(parameters?: Parameters.GetAllProjects, callback?: never): Promise<T>;
  async getAllProjects<T = Models.Project[]>(parameters?: Parameters.GetAllProjects, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/project',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        recent: parameters?.recent,
        properties: parameters?.properties,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.getAllProjects' });
  }

  /**
   * Creates a project based on a project type template, as shown in the following table:
   *
   * | Project Type Key | Project Template Key |
   * |--|--|
   * | `business` | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |
   * | `service_desk` | `com.atlassian.servicedesk:simplified-it-service-desk`, `com.atlassian.servicedesk:simplified-internal-service-desk`, `com.atlassian.servicedesk:simplified-external-service-desk` |
   * | `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |
   * The project types are available according to the installed Jira features as follows:
   *
   *  *  Jira Core, the default, enables `business` projects.
   *  *  Jira Service Management enables `service_desk` projects.
   *  *  Jira Software enables `software` projects.
   *
   * To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** > **Apps** > **Finding new apps**. For more information, see [ Managing add-ons](https://confluence.atlassian.com/x/S31NLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProject<T = Models.ProjectIdentifiers>(parameters: Parameters.CreateProject | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a project based on a project type template, as shown in the following table:
   *
   * | Project Type Key | Project Template Key |
   * |--|--|
   * | `business` | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |
   * | `service_desk` | `com.atlassian.servicedesk:simplified-it-service-desk`, `com.atlassian.servicedesk:simplified-internal-service-desk`, `com.atlassian.servicedesk:simplified-external-service-desk` |
   * | `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |
   * The project types are available according to the installed Jira features as follows:
   *
   *  *  Jira Core, the default, enables `business` projects.
   *  *  Jira Service Management enables `service_desk` projects.
   *  *  Jira Software enables `software` projects.
   *
   * To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** > **Apps** > **Finding new apps**. For more information, see [ Managing add-ons](https://confluence.atlassian.com/x/S31NLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createProject<T = Models.ProjectIdentifiers>(parameters?: Parameters.CreateProject, callback?: never): Promise<T>;
  async createProject<T = Models.ProjectIdentifiers>(parameters?: Parameters.CreateProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/project',
      method: 'POST',
      data: {
        key: parameters?.key,
        name: parameters?.name,
        projectTypeKey: parameters?.projectTypeKey,
        projectTemplateKey: parameters?.projectTemplateKey,
        description: parameters?.description,
        lead: parameters?.lead,
        leadAccountId: parameters?.leadAccountId,
        url: parameters?.url,
        assigneeType: parameters?.assigneeType,
        avatarId: parameters?.avatarId,
        issueSecurityScheme: parameters?.issueSecurityScheme,
        permissionScheme: parameters?.permissionScheme,
        notificationScheme: parameters?.notificationScheme,
        categoryId: parameters?.categoryId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.createProject' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of projects visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Projects are returned only where the user has one of:
   *
   *  *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *  *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjects<T = Models.PageBeanProject>(parameters: Parameters.SearchProjects | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of projects visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Projects are returned only where the user has one of:
   *
   *  *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *  *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *  *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjects<T = Models.PageBeanProject>(parameters?: Parameters.SearchProjects, callback?: never): Promise<T>;
  async searchProjects<T = Models.PageBeanProject>(parameters?: Parameters.SearchProjects, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/project/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        orderBy: parameters?.orderBy,
        query: parameters?.query,
        typeKey: parameters?.typeKey,
        categoryId: parameters?.categoryId,
        action: parameters?.action,
        expand: parameters?.expand,
        status: parameters?.status,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.searchProjects' });
  }

  /**
   * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback: Callback<T>): Promise<void>;
  /**
   * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback?: never): Promise<T>;
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        properties: parameters.properties,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.getProject' });
  }

  /**
   * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.
   *
   * All parameters are optional in the body of the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback: Callback<T>): Promise<void>;
  /**
   * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.
   *
   * All parameters are optional in the body of the request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback?: never): Promise<T>;
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        key: parameters.key,
        name: parameters.name,
        projectTypeKey: parameters.projectTypeKey,
        projectTemplateKey: parameters.projectTemplateKey,
        description: parameters.description,
        lead: parameters.lead,
        leadAccountId: parameters.leadAccountId,
        url: parameters.url,
        assigneeType: parameters.assigneeType,
        avatarId: parameters.avatarId,
        issueSecurityScheme: parameters.issueSecurityScheme,
        permissionScheme: parameters.permissionScheme,
        notificationScheme: parameters.notificationScheme,
        categoryId: parameters.categoryId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.updateProject' });
  }

  /**
   * Deletes a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProject<T = void>(parameters: Parameters.DeleteProject, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProject<T = void>(parameters: Parameters.DeleteProject, callback?: never): Promise<T>;
  async deleteProject<T = void>(parameters: Parameters.DeleteProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'DELETE',
      params: {
        enableUndo: parameters.enableUndo,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.deleteProject' });
  }

  /**
   * Archives a project. Archived projects cannot be deleted. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async archiveProject<T = void>(parameters: Parameters.ArchiveProject, callback: Callback<T>): Promise<void>;
  /**
   * Archives a project. Archived projects cannot be deleted. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async archiveProject<T = void>(parameters: Parameters.ArchiveProject, callback?: never): Promise<T>;
  async archiveProject<T = void>(parameters: Parameters.ArchiveProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/archive`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.archiveProject' });
  }

  /**
   * Deletes a project asynchronously.
   *
   * This operation is:
   *
   *  *  transactional, that is, if part of the delete fails the project is not deleted.
   *  *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProjectAsynchronously<T = unknown>(parameters: Parameters.DeleteProjectAsynchronously, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a project asynchronously.
   *
   * This operation is:
   *
   *  *  transactional, that is, if part of the delete fails the project is not deleted.
   *  *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteProjectAsynchronously<T = unknown>(parameters: Parameters.DeleteProjectAsynchronously, callback?: never): Promise<T>;
  async deleteProjectAsynchronously<T = unknown>(parameters: Parameters.DeleteProjectAsynchronously, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/delete`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.deleteProjectAsynchronously' });
  }

  /**
   * Restores a project from the Jira recycle bin.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback: Callback<T>): Promise<void>;
  /**
   * Restores a project from the Jira recycle bin.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback?: never): Promise<T>;
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.restore' });
  }

  /**
   * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of valid issue types and each issue type has a set of valid statuses.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(parameters: Parameters.GetAllStatuses, callback: Callback<T>): Promise<void>;
  /**
   * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of valid issue types and each issue type has a set of valid statuses.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(parameters: Parameters.GetAllStatuses, callback?: never): Promise<T>;
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(parameters: Parameters.GetAllStatuses, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/statuses`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.getAllStatuses' });
  }

  /**
   * Deprecated, this feature is no longer supported and no alternatives are available, see [Convert project to a different template or type](https://confluence.atlassian.com/x/yEKeOQ). Updates a [project type](https://confluence.atlassian.com/x/GwiiLQ). The project type can be updated for classic projects only, project type cannot be updated for next-gen projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback: Callback<T>): Promise<void>;
  /**
   * Deprecated, this feature is no longer supported and no alternatives are available, see [Convert project to a different template or type](https://confluence.atlassian.com/x/yEKeOQ). Updates a [project type](https://confluence.atlassian.com/x/GwiiLQ). The project type can be updated for classic projects only, project type cannot be updated for next-gen projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback?: never): Promise<T>;
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/type/${parameters.newProjectTypeKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.updateProjectType' });
  }

  /**
   * Get the issue type hierarchy for a next-gen project.
   *
   * The issue type hierarchy for a project consists of:
   *
   *  *  *Epic* at level 1 (optional).
   *  *  One or more issue types at level 0 such as *Story*, *Task*, or *Bug*. Where the issue type *Epic* is defined, these issue types are used to break down the content of an epic.
   *  *  *Subtask* at level -1 (optional). This issue type enables level 0 issue types to be broken down into components. Issues based on a level -1 issue type must have a parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback: Callback<T>): Promise<void>;
  /**
   * Get the issue type hierarchy for a next-gen project.
   *
   * The issue type hierarchy for a project consists of:
   *
   *  *  *Epic* at level 1 (optional).
   *  *  One or more issue types at level 0 such as *Story*, *Task*, or *Bug*. Where the issue type *Epic* is defined, these issue types are used to break down the content of an epic.
   *  *  *Subtask* at level -1 (optional). This issue type enables level 0 issue types to be broken down into components. Issues based on a level -1 issue type must have a parent issue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback?: never): Promise<T>;
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectId}/hierarchy`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.getHierarchy' });
  }

  /**
   * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project. See the [Get notification scheme](#api-rest-api-3-notificationscheme-id-get) resource for more information about notification schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback: Callback<T>): Promise<void>;
  /**
   * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project. See the [Get notification scheme](#api-rest-api-3-notificationscheme-id-get) resource for more information about notification schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback?: never): Promise<T>;
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/notificationscheme`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projects.getNotificationSchemeForProject' });
  }
}
