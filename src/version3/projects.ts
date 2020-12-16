import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Projects {
  constructor(private client: Client) { }
  async getAllProjects<T = any>(parameters?: Parameters.GetAllProjects, callback?: Callback<T>): Promise<void>;
  async getAllProjects<T = any>(parameters?: Parameters.GetAllProjects, callback?: undefined): Promise<T>;
  async getAllProjects<T = any>(parameters?: Parameters.GetAllProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/project',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        recent: parameters?.recent,
        properties: parameters?.properties,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createProject<T = any>(callback?: Callback<T>): Promise<void>;
  async createProject<T = any>(callback?: undefined): Promise<T>;
  async createProject<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/project',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async searchProjects<T = Models.PageBeanProject>(parameters?: Parameters.SearchProjects, callback?: Callback<T>): Promise<void>;
  async searchProjects<T = Models.PageBeanProject>(parameters?: Parameters.SearchProjects, callback?: undefined): Promise<T>;
  async searchProjects<T = Models.PageBeanProject>(parameters?: Parameters.SearchProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/project/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        orderBy: parameters?.orderBy,
        query: parameters?.query,
        typeKey: parameters?.typeKey,
        categoryId: parameters?.categoryId,
        searchBy: parameters?.searchBy,
        action: parameters?.action,
        expand: parameters?.expand,
        status: parameters?.status,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback: Callback<T>): Promise<void>;
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback?: undefined): Promise<T>;
  async getProject<T = Models.Project>(parameters: Parameters.GetProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        properties: parameters.properties,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback: Callback<T>): Promise<void>;
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback?: undefined): Promise<T>;
  async updateProject<T = Models.Project>(parameters: Parameters.UpdateProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProject<T = any>(parameters: Parameters.DeleteProject, callback: Callback<T>): Promise<void>;
  async deleteProject<T = any>(parameters: Parameters.DeleteProject, callback?: undefined): Promise<T>;
  async deleteProject<T = any>(parameters: Parameters.DeleteProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'DELETE',
      params: {
        enableUndo: parameters.enableUndo,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async archiveProject<T = any>(parameters: Parameters.ArchiveProject, callback: Callback<T>): Promise<void>;
  async archiveProject<T = any>(parameters: Parameters.ArchiveProject, callback?: undefined): Promise<T>;
  async archiveProject<T = any>(parameters: Parameters.ArchiveProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/archive`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProjectAsynchronously<T = any>(parameters: Parameters.DeleteProjectAsynchronously, callback: Callback<T>): Promise<void>;
  async deleteProjectAsynchronously<T = any>(parameters: Parameters.DeleteProjectAsynchronously, callback?: undefined): Promise<T>;
  async deleteProjectAsynchronously<T = any>(parameters: Parameters.DeleteProjectAsynchronously, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/delete`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback: Callback<T>): Promise<void>;
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback?: undefined): Promise<T>;
  async restore<T = Models.Project>(parameters: Parameters.Restore, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/restore`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllStatuses<T = any>(parameters: Parameters.GetAllStatuses, callback: Callback<T>): Promise<void>;
  async getAllStatuses<T = any>(parameters: Parameters.GetAllStatuses, callback?: undefined): Promise<T>;
  async getAllStatuses<T = any>(parameters: Parameters.GetAllStatuses, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/statuses`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback: Callback<T>): Promise<void>;
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback?: undefined): Promise<T>;
  async updateProjectType<T = Models.Project>(parameters: Parameters.UpdateProjectType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/type/${parameters.newProjectTypeKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback: Callback<T>): Promise<void>;
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback?: undefined): Promise<T>;
  async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: Parameters.GetHierarchy, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectId}/hierarchy`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback: Callback<T>): Promise<void>;
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback?: undefined): Promise<T>;
  async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: Parameters.GetNotificationSchemeForProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/notificationscheme`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
