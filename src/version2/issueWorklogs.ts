import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWorklogs {
  constructor(private client: Client) { }
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback: Callback<T>): Promise<void>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: undefined): Promise<T>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        startedAfter: parameters.startedAfter,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback: Callback<T>): Promise<void>;
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: undefined): Promise<T>;
  async addWorklog<T = Models.Worklog>(parameters: Parameters.AddWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'POST',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        reduceBy: parameters.reduceBy,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      data: {
        self: parameters.self,
        author: parameters.author,
        updateAuthor: parameters.updateAuthor,
        comment: parameters.comment,
        created: parameters.created,
        updated: parameters.updated,
        visibility: parameters.visibility,
        started: parameters.started,
        timeSpent: parameters.timeSpent,
        timeSpentSeconds: parameters.timeSpentSeconds,
        id: parameters.id,
        issueId: parameters.issueId,
        properties: parameters.properties,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback: Callback<T>): Promise<void>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: undefined): Promise<T>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback: Callback<T>): Promise<void>;
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback?: undefined): Promise<T>;
  async updateWorklog<T = Models.Worklog>(parameters: Parameters.UpdateWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback: Callback<T>): Promise<void>;
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: undefined): Promise<T>;
  async deleteWorklog<T = void>(parameters: Parameters.DeleteWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'DELETE',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        increaseBy: parameters.increaseBy,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsDeletedSince, callback?: Callback<T>): Promise<void>;
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsDeletedSince, callback?: undefined): Promise<T>;
  async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsDeletedSince, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/worklog/deleted',
      method: 'GET',
      params: {
        since: parameters?.since,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorklogsForIds<T = any>(parameters?: Parameters.GetWorklogsForIds, callback?: Callback<T>): Promise<void>;
  async getWorklogsForIds<T = any>(parameters?: Parameters.GetWorklogsForIds, callback?: undefined): Promise<T>;
  async getWorklogsForIds<T = any>(parameters?: Parameters.GetWorklogsForIds, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/worklog/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        ids: parameters?.ids,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: Callback<T>): Promise<void>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: undefined): Promise<T>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/worklog/updated',
      method: 'GET',
      params: {
        since: parameters?.since,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
