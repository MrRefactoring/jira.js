import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ProjectComponents {
  constructor(private readonly client: Sender) { }

  public async createComponent(
    params: {
      self?: string;
      id?: string;
      name?: string;
      description?: string;
      lead?: any;
      leadUserName?: string;
      leadAccountId?: string;
      assigneeType?: string;
      assignee?: any;
      realAssigneeType?: string;
      realAssignee?: any;
      isAssigneeTypeValid?: boolean;
      project?: string;
      projectId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/component',
      method: 'POST',
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
        lead: params.lead,
        leadUserName: params.leadUserName,
        leadAccountId: params.leadAccountId,
        assigneeType: params.assigneeType,
        assignee: params.assignee,
        realAssigneeType: params.realAssigneeType,
        realAssignee: params.realAssignee,
        isAssigneeTypeValid: params.isAssigneeTypeValid,
        project: params.project,
        projectId: params.projectId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getComponent(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${params.id}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateComponent(
    params: {
      id: string;
      self?: string;
      name?: string;
      description?: string;
      lead?: any;
      leadUserName?: string;
      leadAccountId?: string;
      assigneeType?: string;
      assignee?: any;
      realAssigneeType?: string;
      realAssignee?: any;
      isAssigneeTypeValid?: boolean;
      project?: string;
      projectId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${params.id}`,
      method: 'PUT',
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
        lead: params.lead,
        leadUserName: params.leadUserName,
        leadAccountId: params.leadAccountId,
        assigneeType: params.assigneeType,
        assignee: params.assignee,
        realAssigneeType: params.realAssigneeType,
        realAssignee: params.realAssignee,
        isAssigneeTypeValid: params.isAssigneeTypeValid,
        project: params.project,
        projectId: params.projectId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteComponent(
    params: {
      id: string;
      moveIssuesTo?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${params.id}`,
      method: 'DELETE',
      params: {
        moveIssuesTo: params.moveIssuesTo
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getComponentIssuesCount(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/component/${params.id}/relatedIssueCounts`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectComponentsPaginated(
    params: {
      projectIdOrKey: string;
      startAt?: number;
      maxResults?: number;
      orderBy?: string;
      query?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/component`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        orderBy: params.orderBy,
        query: params.query
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getProjectComponents(
    params: {
      projectIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/components`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }
}
