import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectComponents {
  constructor(private client: Client) { }
  async createComponent<T = Models.Component>(parameters?: Parameters.CreateComponent, callback?: Callback<T>): Promise<void>;
  async createComponent<T = Models.Component>(parameters?: Parameters.CreateComponent, callback?: undefined): Promise<T>;
  async createComponent<T = Models.Component>(parameters?: Parameters.CreateComponent, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/component',
      method: 'POST',
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
        lead: parameters?.lead,
        leadUserName: parameters?.leadUserName,
        leadAccountId: parameters?.leadAccountId,
        assigneeType: parameters?.assigneeType,
        assignee: parameters?.assignee,
        realAssigneeType: parameters?.realAssigneeType,
        realAssignee: parameters?.realAssignee,
        isAssigneeTypeValid: parameters?.isAssigneeTypeValid,
        project: parameters?.project,
        projectId: parameters?.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getComponent<T = Models.Component>(parameters: Parameters.GetComponent, callback: Callback<T>): Promise<void>;
  async getComponent<T = Models.Component>(parameters: Parameters.GetComponent, callback?: undefined): Promise<T>;
  async getComponent<T = Models.Component>(parameters: Parameters.GetComponent, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateComponent<T = Models.Component>(parameters: Parameters.UpdateComponent, callback: Callback<T>): Promise<void>;
  async updateComponent<T = Models.Component>(parameters: Parameters.UpdateComponent, callback?: undefined): Promise<T>;
  async updateComponent<T = Models.Component>(parameters: Parameters.UpdateComponent, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        leadUserName: parameters.leadUserName,
        leadAccountId: parameters.leadAccountId,
        assigneeType: parameters.assigneeType,
        project: parameters.project,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback: Callback<T>): Promise<void>;
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback?: undefined): Promise<T>;
  async deleteComponent<T = void>(parameters: Parameters.DeleteComponent, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/component/${parameters.id}`,
      method: 'DELETE',
      params: {
        moveIssuesTo: parameters.moveIssuesTo,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: Parameters.GetComponentRelatedIssues, callback: Callback<T>): Promise<void>;
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: Parameters.GetComponentRelatedIssues, callback?: undefined): Promise<T>;
  async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: Parameters.GetComponentRelatedIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/component/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: Parameters.GetProjectComponentsPaginated, callback: Callback<T>): Promise<void>;
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: Parameters.GetProjectComponentsPaginated, callback?: undefined): Promise<T>;
  async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: Parameters.GetProjectComponentsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/component`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectComponents<T = any>(parameters: Parameters.GetProjectComponents, callback: Callback<T>): Promise<void>;
  async getProjectComponents<T = any>(parameters: Parameters.GetProjectComponents, callback?: undefined): Promise<T>;
  async getProjectComponents<T = any>(parameters: Parameters.GetProjectComponents, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/components`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
