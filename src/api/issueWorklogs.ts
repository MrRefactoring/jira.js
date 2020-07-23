import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueWorklogs {
  constructor(private readonly client: Sender) { }

  public async getIssueWorklogs(
    params: {
      issueIdOrKey: string;
      startAt?: number;
      maxResults?: number;
      startedAfter?: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        startedAfter: params.startedAfter,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async addWorklog(
    params: {
      issueIdOrKey: string;
      notifyUsers?: boolean;
      adjustEstimate?: string;
      newEstimate?: string;
      reduceBy?: string;
      expand?: string;
      overrideEditableFlag?: boolean;
      self?: string;
      author?: any;
      updateAuthor?: any;
      comment?: string;
      created?: string;
      updated?: string;
      visibility?: any;
      started?: string;
      timeSpent?: string;
      timeSpentSeconds?: number;
      id?: string;
      issueId?: string;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog`,
      method: 'POST',
      params: {
        notifyUsers: params.notifyUsers,
        adjustEstimate: params.adjustEstimate,
        newEstimate: params.newEstimate,
        reduceBy: params.reduceBy,
        expand: params.expand,
        overrideEditableFlag: params.overrideEditableFlag,
      },
      data: {
        ...params,
        issueIdOrKey: undefined,
        notifyUsers: undefined,
        adjustEstimate: undefined,
        newEstimate: undefined,
        reduceBy: undefined,
        expand: undefined,
        overrideEditableFlag: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorklog(
    params: {
      issueIdOrKey: string;
      id: string;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.id}`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateWorklog(
    params: {
      issueIdOrKey: string;
      id: string;
      notifyUsers?: boolean;
      adjustEstimate?: string;
      newEstimate?: string;
      expand?: string;
      overrideEditableFlag?: boolean;
      self?: string;
      author?: any;
      updateAuthor?: any;
      comment?: string;
      created?: string;
      updated?: string;
      visibility?: any;
      started?: string;
      timeSpent?: string;
      timeSpentSeconds?: number;
      issueId?: string;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.id}`,
      method: 'PUT',
      params: {
        notifyUsers: params.notifyUsers,
        adjustEstimate: params.adjustEstimate,
        newEstimate: params.newEstimate,
        expand: params.expand,
        overrideEditableFlag: params.overrideEditableFlag,
      },
      data: {
        ...params,
        issueIdOrKey: undefined,
        id: undefined,
        notifyUsers: undefined,
        adjustEstimate: undefined,
        newEstimate: undefined,
        expand: undefined,
        overrideEditableFlag: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWorklog(
    params: {
      issueIdOrKey: string;
      id: string;
      notifyUsers?: boolean;
      adjustEstimate?: string;
      newEstimate?: string;
      increaseBy?: string;
      overrideEditableFlag?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/worklog/${params.id}`,
      method: 'DELETE',
      params: {
        notifyUsers: params.notifyUsers,
        adjustEstimate: params.adjustEstimate,
        newEstimate: params.newEstimate,
        increaseBy: params.increaseBy,
        overrideEditableFlag: params.overrideEditableFlag,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIdsOfDeletedWorklogs(
    params?: {
      since?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/deleted',
      method: 'GET',
      params: {
        since: params.since,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorklogs(
    params: {
      expand?: string;
      ids: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/list',
      method: 'POST',
      params: {
        expand: params.expand,
      },
      data: {
        ids: params.ids,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIdsOfUpdatedWorklogs(
    params?: {
      since?: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/worklog/updated',
      method: 'GET',
      params: {
        since: params.since,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
