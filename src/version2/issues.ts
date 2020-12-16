import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Issues {
  constructor(private client: Client) { }
  async createIssue<T = any>(parameters?: Parameters.CreateIssue, callback?: Callback<T>): Promise<void>;
  async createIssue<T = any>(parameters?: Parameters.CreateIssue, callback?: undefined): Promise<T>;
  async createIssue<T = any>(parameters?: Parameters.CreateIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issue',
      method: 'POST',
      params: {
        updateHistory: parameters?.updateHistory,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssues<T = any>(callback?: Callback<T>): Promise<void>;
  async createIssues<T = any>(callback?: undefined): Promise<T>;
  async createIssues<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issue/bulk',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters?: Parameters.GetCreateIssueMeta, callback?: Callback<T>): Promise<void>;
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters?: Parameters.GetCreateIssueMeta, callback?: undefined): Promise<T>;
  async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters?: Parameters.GetCreateIssueMeta, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issue/createmeta',
      method: 'GET',
      params: {
        projectIds: parameters?.projectIds,
        projectKeys: parameters?.projectKeys,
        issuetypeIds: parameters?.issuetypeIds,
        issuetypeNames: parameters?.issuetypeNames,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssue<T = Models.IssueBean>(parameters: Parameters.GetIssue, callback: Callback<T>): Promise<void>;
  async getIssue<T = Models.IssueBean>(parameters: Parameters.GetIssue, callback?: undefined): Promise<T>;
  async getIssue<T = Models.IssueBean>(parameters: Parameters.GetIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'GET',
      params: {
        fields: parameters.fields,
        fieldsByKeys: parameters.fieldsByKeys,
        expand: parameters.expand,
        properties: parameters.properties,
        updateHistory: parameters.updateHistory,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async editIssue<T = any>(parameters: Parameters.EditIssue, callback: Callback<T>): Promise<void>;
  async editIssue<T = any>(parameters: Parameters.EditIssue, callback?: undefined): Promise<T>;
  async editIssue<T = any>(parameters: Parameters.EditIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'PUT',
      params: {
        notifyUsers: parameters.notifyUsers,
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssue<T = any>(parameters: Parameters.DeleteIssue, callback: Callback<T>): Promise<void>;
  async deleteIssue<T = any>(parameters: Parameters.DeleteIssue, callback?: undefined): Promise<T>;
  async deleteIssue<T = any>(parameters: Parameters.DeleteIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
      method: 'DELETE',
      params: {
        deleteSubtasks: parameters.deleteSubtasks,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async assignIssue<T = any>(parameters: Parameters.AssignIssue, callback: Callback<T>): Promise<void>;
  async assignIssue<T = any>(parameters: Parameters.AssignIssue, callback?: undefined): Promise<T>;
  async assignIssue<T = any>(parameters: Parameters.AssignIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getChangeLogs<T = Models.PageBeanChangelog>(parameters: Parameters.GetChangeLogs, callback: Callback<T>): Promise<void>;
  async getChangeLogs<T = Models.PageBeanChangelog>(parameters: Parameters.GetChangeLogs, callback?: undefined): Promise<T>;
  async getChangeLogs<T = Models.PageBeanChangelog>(parameters: Parameters.GetChangeLogs, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: Parameters.GetEditIssueMeta, callback: Callback<T>): Promise<void>;
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: Parameters.GetEditIssueMeta, callback?: undefined): Promise<T>;
  async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: Parameters.GetEditIssueMeta, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/editmeta`,
      method: 'GET',
      params: {
        overrideScreenSecurity: parameters.overrideScreenSecurity,
        overrideEditableFlag: parameters.overrideEditableFlag,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async notify<T = any>(parameters: Parameters.Notify, callback: Callback<T>): Promise<void>;
  async notify<T = any>(parameters: Parameters.Notify, callback?: undefined): Promise<T>;
  async notify<T = any>(parameters: Parameters.Notify, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getTransitions<T = Models.Transitions>(parameters: Parameters.GetTransitions, callback: Callback<T>): Promise<void>;
  async getTransitions<T = Models.Transitions>(parameters: Parameters.GetTransitions, callback?: undefined): Promise<T>;
  async getTransitions<T = Models.Transitions>(parameters: Parameters.GetTransitions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        transitionId: parameters.transitionId,
        skipRemoteOnlyCondition: parameters.skipRemoteOnlyCondition,
        includeUnavailableTransitions: parameters.includeUnavailableTransitions,
        sortByOpsBarAndStatus: parameters.sortByOpsBarAndStatus,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async doTransition<T = any>(parameters: Parameters.DoTransition, callback: Callback<T>): Promise<void>;
  async doTransition<T = any>(parameters: Parameters.DoTransition, callback?: undefined): Promise<T>;
  async doTransition<T = any>(parameters: Parameters.DoTransition, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
