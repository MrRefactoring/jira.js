import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Projects {
  constructor(private readonly client: Sender) { }

  public async getAllProjects(
    params?: {
      expand?: string;
      recent?: number;
      properties?: Array<string>;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/project',
      method: 'GET',
      params: {
        expand: params.expand,
        recent: params.recent,
        properties: params.properties && params.properties.join(',')
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createProject(
    params: {
      key?: string;
      name?: string;
      projectTypeKey?: string;
      projectTemplateKey?: string;
      description?: string;
      lead?: string;
      leadAccountId?: string;
      url?: string;
      assigneeType?: string;
      avatarId?: number;
      issueSecurityScheme?: number;
      permissionScheme?: number;
      notificationScheme?: number;
      categoryId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/project',
      method: 'POST',
      data: {
        key: params.key,
        name: params.name,
        projectTypeKey: params.projectTypeKey,
        projectTemplateKey: params.projectTemplateKey,
        description: params.description,
        lead: params.lead,
        leadAccountId: params.leadAccountId,
        url: params.url,
        assigneeType: params.assigneeType,
        avatarId: params.avatarId,
        issueSecurityScheme: params.issueSecurityScheme,
        permissionScheme: params.permissionScheme,
        notificationScheme: params.notificationScheme,
        categoryId: params.categoryId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectsPaginated(
    params: {
      startAt?: number;
      maxResults?: number;
      orderBy?: string;
      query?: string;
      typeKey?: string;
      categoryId?: number;
      searchBy?: string;
      action?: string;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/project/search',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        orderBy: params.orderBy,
        query: params.query,
        typeKey: params.typeKey,
        categoryId: params.categoryId,
        searchBy: params.searchBy,
        action: params.action,
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProject(
    params: {
      projectIdOrKey: string;
      expand?: string;
      properties?: Array<string>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}`,
      method: 'GET',
      params: {
        expand: params.expand,
        properties: params.properties && params.properties.join(',')
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateProject(
    params: {
      projectIdOrKey: string;
      expand?: string;
      key?: string;
      name?: string;
      projectTypeKey?: string;
      projectTemplateKey?: string;
      description?: string;
      lead?: string;
      leadAccountId?: string;
      url?: string;
      assigneeType?: string;
      avatarId?: number;
      issueSecurityScheme?: number;
      permissionScheme?: number;
      notificationScheme?: number;
      categoryId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}`,
      method: 'PUT',
      params: {
        expand: params.expand
      },
      data: {
        key: params.key,
        name: params.name,
        projectTypeKey: params.projectTypeKey,
        projectTemplateKey: params.projectTemplateKey,
        description: params.description,
        lead: params.lead,
        leadAccountId: params.leadAccountId,
        url: params.url,
        assigneeType: params.assigneeType,
        avatarId: params.avatarId,
        issueSecurityScheme: params.issueSecurityScheme,
        permissionScheme: params.permissionScheme,
        notificationScheme: params.notificationScheme,
        categoryId: params.categoryId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteProject(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllStatusesForProject(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/statuses`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateProjectType(
    params: {
      projectIdOrKey: string;
      newProjectTypeKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/type/${params.newProjectTypeKey}`,
      method: 'PUT'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectIssueTypeHierarchy(
    params: {
      projectId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectId}/hierarchy`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectNotificationScheme(
    params: {
      projectKeyOrId: string;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectKeyOrId}/notificationscheme`,
      method: 'GET',
      params: {
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
