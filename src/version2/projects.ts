import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Projects {
  constructor(private client: Client) {}

  /**
   * Creates a project based on a project type template, as shown in the following table:
   *
   * | Project Type Key | Project Template Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
   * | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `business`       | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
   * | `service_desk`   | `com.atlassian.servicedesk:simplified-it-service-management`, `com.atlassian.servicedesk:simplified-general-service-desk-it`, `com.atlassian.servicedesk:simplified-general-service-desk-business`, `com.atlassian.servicedesk:simplified-external-service-desk`, `com.atlassian.servicedesk:simplified-hr-service-desk`, `com.atlassian.servicedesk:simplified-facilities-service-desk`, `com.atlassian.servicedesk:simplified-legal-service-desk`, `com.atlassian.servicedesk:simplified-analytics-service-desk`, `com.atlassian.servicedesk:simplified-marketing-service-desk`, `com.atlassian.servicedesk:simplified-design-service-desk`, `com.atlassian.servicedesk:simplified-sales-service-desk`, `com.atlassian.servicedesk:simplified-blank-project-business`, `com.atlassian.servicedesk:simplified-blank-project-it`, `com.atlassian.servicedesk:simplified-finance-service-desk`, `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`, `com.atlassian.servicedesk:next-gen-legal-service-desk`, `com.atlassian.servicedesk:next-gen-marketing-service-desk`, `com.atlassian.servicedesk:next-gen-facilities-service-desk`, `com.atlassian.servicedesk:next-gen-general-it-service-desk`, `com.atlassian.servicedesk:next-gen-general-business-service-desk`, `com.atlassian.servicedesk:next-gen-analytics-service-desk`, `com.atlassian.servicedesk:next-gen-finance-service-desk`, `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk` |
   * | `software`       | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
   *
   * The project types are available according to the installed Jira features as follows:
   *
   * - Jira Core, the default, enables `business` projects.
   * - Jira Service Management enables `service_desk` projects.
   * - Jira Software enables `software` projects.
   *
   * To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the
   * System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** >
   * **Apps** > **Finding new apps**. For more information, see [ Managing
   * add-ons](https://confluence.atlassian.com/x/S31NLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProject<T = Models.ProjectIdentifiers>(
    parameters: Parameters.CreateProject,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a project based on a project type template, as shown in the following table:
   *
   * | Project Type Key | Project Template Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
   * | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `business`       | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
   * | `service_desk`   | `com.atlassian.servicedesk:simplified-it-service-management`, `com.atlassian.servicedesk:simplified-general-service-desk-it`, `com.atlassian.servicedesk:simplified-general-service-desk-business`, `com.atlassian.servicedesk:simplified-external-service-desk`, `com.atlassian.servicedesk:simplified-hr-service-desk`, `com.atlassian.servicedesk:simplified-facilities-service-desk`, `com.atlassian.servicedesk:simplified-legal-service-desk`, `com.atlassian.servicedesk:simplified-analytics-service-desk`, `com.atlassian.servicedesk:simplified-marketing-service-desk`, `com.atlassian.servicedesk:simplified-design-service-desk`, `com.atlassian.servicedesk:simplified-sales-service-desk`, `com.atlassian.servicedesk:simplified-blank-project-business`, `com.atlassian.servicedesk:simplified-blank-project-it`, `com.atlassian.servicedesk:simplified-finance-service-desk`, `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`, `com.atlassian.servicedesk:next-gen-legal-service-desk`, `com.atlassian.servicedesk:next-gen-marketing-service-desk`, `com.atlassian.servicedesk:next-gen-facilities-service-desk`, `com.atlassian.servicedesk:next-gen-general-it-service-desk`, `com.atlassian.servicedesk:next-gen-general-business-service-desk`, `com.atlassian.servicedesk:next-gen-analytics-service-desk`, `com.atlassian.servicedesk:next-gen-finance-service-desk`, `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk` |
   * | `software`       | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
   *
   * The project types are available according to the installed Jira features as follows:
   *
   * - Jira Core, the default, enables `business` projects.
   * - Jira Service Management enables `service_desk` projects.
   * - Jira Software enables `software` projects.
   *
   * To determine which features are installed, go to **Jira settings** > **Apps** > **Manage apps** and review the
   * System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** >
   * **Apps** > **Finding new apps**. For more information, see [ Managing
   * add-ons](https://confluence.atlassian.com/x/S31NLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProject<T = Models.ProjectIdentifiers>(
    parameters: Parameters.CreateProject,
    callback?: never,
  ): Promise<T>;
  async createProject<T = Models.ProjectIdentifiers>(
    parameters: Parameters.CreateProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project',
      method: 'POST',
      data: {
        assigneeType: parameters.assigneeType,
        avatarId: parameters.avatarId,
        categoryId: parameters.categoryId,
        description: parameters.description,
        fieldConfigurationScheme: parameters.fieldConfigurationScheme,
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
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of up to 20 projects recently viewed by the user that are still visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Projects are returned only where the user has one of:
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getRecent<T = Models.Project[]>(
    parameters: Parameters.GetRecent | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of up to 20 projects recently viewed by the user that are still visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Projects are returned only where the user has one of:
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getRecent<T = Models.Project[]>(parameters?: Parameters.GetRecent, callback?: never): Promise<T>;
  async getRecent<T = Models.Project[]>(parameters?: Parameters.GetRecent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project/recent',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        properties: parameters?.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Projects are returned only where the user has one of:
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjects<T = Models.PageProject>(
    parameters: Parameters.SearchProjects | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects visible to the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Projects are returned only where the user has one of:
   *
   * - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjects<T = Models.PageProject>(parameters?: Parameters.SearchProjects, callback?: never): Promise<T>;
  async searchProjects<T = Models.PageProject>(
    parameters?: Parameters.SearchProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project/search',
      method: 'GET',
      params: {
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
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProject<T = Models.Project>(
    parameters: Parameters.GetProject | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the [project details](https://confluence.atlassian.com/x/ahLpNw) for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProject<T = Models.Project>(parameters: Parameters.GetProject | string, callback?: never): Promise<T>;
  async getProject<T = Models.Project>(
    parameters: Parameters.GetProject | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' ? parameters.expand : undefined,
        properties: typeof parameters !== 'string' ? parameters.properties : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.
   *
   * All parameters are optional in the body of the request. Schemes will only be updated if they are included in the
   * request, any omitted schemes will be left unchanged.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). is only needed when changing the
   * schemes or project key. Otherwise you will only need _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback: Callback<T>): Promise<void>;
  /**
   * Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.
   *
   * All parameters are optional in the body of the request. Schemes will only be updated if they are included in the
   * request, any omitted schemes will be left unchanged.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). is only needed when changing the
   * schemes or project key. Otherwise you will only need _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback?: never): Promise<T>;
  async updateProject<T = Models.Project>(
    parameters: Parameters.UpdateProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
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
        projectTemplateKey: parameters.projectTemplateKey,
        projectTypeKey: parameters.projectTypeKey,
        releasedProjectKeys: parameters.releasedProjectKeys,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a project.
   *
   * You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it.
   * To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProject<T = void>(parameters: Parameters.DeleteProject | string, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a project.
   *
   * You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it.
   * To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProject<T = void>(parameters: Parameters.DeleteProject | string, callback?: never): Promise<T>;
  async deleteProject<T = void>(
    parameters: Parameters.DeleteProject | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}`,
      method: 'DELETE',
      params: {
        enableUndo: typeof parameters !== 'string' ? parameters.enableUndo : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project
   * and then delete it. To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archiveProject<T = void>(parameters: Parameters.ArchiveProject | string, callback: Callback<T>): Promise<void>;
  /**
   * Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project
   * and then delete it. To restore a project, use the Jira UI.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archiveProject<T = void>(parameters: Parameters.ArchiveProject | string, callback?: never): Promise<T>;
  async archiveProject<T = void>(
    parameters: Parameters.ArchiveProject | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/archive`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a project asynchronously.
   *
   * This operation is:
   *
   * - Transactional, that is, if part of the delete fails the project is not deleted.
   * - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectAsynchronously<T = unknown>(
    parameters: Parameters.DeleteProjectAsynchronously | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a project asynchronously.
   *
   * This operation is:
   *
   * - Transactional, that is, if part of the delete fails the project is not deleted.
   * - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteProjectAsynchronously<T = unknown>(
    parameters: Parameters.DeleteProjectAsynchronously | string,
    callback?: never,
  ): Promise<T>;
  async deleteProjectAsynchronously<T = unknown>(
    parameters: Parameters.DeleteProjectAsynchronously | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/delete`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Restores a project that has been archived or placed in the Jira recycle bin.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)for Company managed projects.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project for Team managed projects.
   */
  async restore<T = Models.Project>(parameters: Parameters.Restore | string, callback: Callback<T>): Promise<void>;
  /**
   * Restores a project that has been archived or placed in the Jira recycle bin.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg)for Company managed projects.
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project for Team managed projects.
   */
  async restore<T = Models.Project>(parameters: Parameters.Restore | string, callback?: never): Promise<T>;
  async restore<T = Models.Project>(
    parameters: Parameters.Restore | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of
   * valid issue types and each issue type has a set of valid statuses.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(
    parameters: Parameters.GetAllStatuses | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the valid statuses for a project. The statuses are grouped by issue type, as each project has a set of
   * valid issue types and each issue type has a set of valid statuses.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(
    parameters: Parameters.GetAllStatuses | string,
    callback?: never,
  ): Promise<T>;
  async getAllStatuses<T = Models.IssueTypeWithStatus[]>(
    parameters: Parameters.GetAllStatuses | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/statuses`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(
    parameters: Parameters.GetHierarchy | string,
    callback: Callback<T>,
  ): Promise<void>;
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(
    parameters: Parameters.GetHierarchy | string,
    callback?: never,
  ): Promise<T>;
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(
    parameters: Parameters.GetHierarchy | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectId = typeof parameters === 'string' ? parameters : parameters.projectId;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectId}/hierarchy`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationSchemeForProject | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets a [notification scheme](https://confluence.atlassian.com/x/8YdKLg) associated with the project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationSchemeForProject | string,
    callback?: never,
  ): Promise<T>;
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(
    parameters: Parameters.GetNotificationSchemeForProject | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectKeyOrId = typeof parameters === 'string' ? parameters : parameters.projectKeyOrId;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectKeyOrId}/notificationscheme`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' ? parameters.expand : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
