import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWorklogs {
  constructor(private client: Client) { }
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback: Callback<T>): Promise<void>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: undefined): Promise<T>;
  async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: Parameters.GetIssueWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
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
  async addWorklog<T = any>(parameters: Parameters.AddWorklog, callback: Callback<T>): Promise<void>;
  async addWorklog<T = any>(parameters: Parameters.AddWorklog, callback?: undefined): Promise<T>;
  async addWorklog<T = any>(parameters: Parameters.AddWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog`,
      method: 'POST',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        reduceBy: parameters.reduceBy,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback: Callback<T>): Promise<void>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: undefined): Promise<T>;
  async getWorklog<T = Models.Worklog>(parameters: Parameters.GetWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
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
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        adjustEstimate: parameters.adjustEstimate,
        newEstimate: parameters.newEstimate,
        expand: parameters.expand,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorklog<T = any>(parameters: Parameters.DeleteWorklog, callback: Callback<T>): Promise<void>;
  async deleteWorklog<T = any>(parameters: Parameters.DeleteWorklog, callback?: undefined): Promise<T>;
  async deleteWorklog<T = any>(parameters: Parameters.DeleteWorklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
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
      url: '/rest/api/3/worklog/deleted',
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
      url: '/rest/api/3/worklog/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: Callback<T>): Promise<void>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: undefined): Promise<T>;
  async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters?: Parameters.GetIdsOfWorklogsModifiedSince, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/worklog/updated',
      method: 'GET',
      params: {
        since: parameters?.since,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
