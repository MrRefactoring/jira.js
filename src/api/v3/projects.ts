import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  ProjectIdentifiers as ProjectIdentifiersResponse, PageBeanProject as PageBeanProjectResponse, Project as ProjectResponse, ProjectIssueTypeHierarchy as ProjectIssueTypeHierarchyResponse, NotificationScheme as NotificationSchemeResponse,
} from '../../models/v3';

export class Projects {
  constructor(private readonly client: Client) { }

  async getAllProjects(parameters?: {
    expand?: string;
    recent?: number;
    properties?: string[];
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/project',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createProject(parameters?: any, callback?: Callback<ProjectIdentifiersResponse>): Promise<ProjectIdentifiersResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/project',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async searchProjects(parameters?: {
    startAt?: number;
    maxResults?: number;
    orderBy?: string;
    query?: string;
    typeKey?: string;
    categoryId?: number;
    searchBy?: string;
    action?: string;
    expand?: string;
    status?: string[];
  }, callback?: Callback<PageBeanProjectResponse>): Promise<PageBeanProjectResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/project/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProject(parameters: {
    projectIdOrKey: string;
    expand?: string;
    properties?: string[];
  }, callback?: Callback<ProjectResponse>): Promise<ProjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateProject(parameters: {
    projectIdOrKey: string;
    expand?: string;
  }, callback?: Callback<ProjectResponse>): Promise<ProjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProject(parameters: {
    projectIdOrKey: string;
    enableUndo?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProjectAsynchronously(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/delete`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async restore(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<ProjectResponse>): Promise<ProjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/restore`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllStatuses(parameters: {
    projectIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/statuses`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateProjectType(parameters: {
    projectIdOrKey: string;
    newProjectTypeKey: string;
  }, callback?: Callback<ProjectResponse>): Promise<ProjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/type/${parameters.newProjectTypeKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getHierarchy(parameters: {
    projectId: number;
  }, callback?: Callback<ProjectIssueTypeHierarchyResponse>): Promise<ProjectIssueTypeHierarchyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectId}/hierarchy`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getNotificationSchemeForProject(parameters: {
    projectKeyOrId: string;
    expand?: string;
  }, callback?: Callback<NotificationSchemeResponse>): Promise<NotificationSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/project/${parameters.projectKeyOrId}/notificationscheme`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
