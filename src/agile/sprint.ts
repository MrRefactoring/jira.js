import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Sprint {
  constructor(private client: Client) { }
  async createSprint<T = any>(parameters?: Parameters.CreateSprint, callback?: Callback<T>): Promise<void>;
  async createSprint<T = any>(parameters?: Parameters.CreateSprint, callback?: undefined): Promise<T>;
  async createSprint<T = any>(parameters?: Parameters.CreateSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/sprint',
      method: 'POST',
      data: {
        name: parameters?.name,
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        originBoardId: parameters?.originBoardId,
        goal: parameters?.goal,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSprint<T = any>(parameters: Parameters.GetSprint, callback: Callback<T>): Promise<void>;
  async getSprint<T = any>(parameters: Parameters.GetSprint, callback?: undefined): Promise<T>;
  async getSprint<T = any>(parameters: Parameters.GetSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async partiallyUpdateSprint<T = any>(parameters: Parameters.PartiallyUpdateSprint, callback: Callback<T>): Promise<void>;
  async partiallyUpdateSprint<T = any>(parameters: Parameters.PartiallyUpdateSprint, callback?: undefined): Promise<T>;
  async partiallyUpdateSprint<T = any>(parameters: Parameters.PartiallyUpdateSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'POST',
      data: {
        id: parameters.id,
        self: parameters.self,
        state: parameters.state,
        name: parameters.name,
        startDate: parameters.startDate,
        endDate: parameters.endDate,
        completeDate: parameters.completeDate,
        originBoardId: parameters.originBoardId,
        goal: parameters.goal,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateSprint<T = any>(parameters: Parameters.UpdateSprint, callback: Callback<T>): Promise<void>;
  async updateSprint<T = any>(parameters: Parameters.UpdateSprint, callback?: undefined): Promise<T>;
  async updateSprint<T = any>(parameters: Parameters.UpdateSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        self: parameters.self,
        state: parameters.state,
        name: parameters.name,
        startDate: parameters.startDate,
        endDate: parameters.endDate,
        completeDate: parameters.completeDate,
        originBoardId: parameters.originBoardId,
        goal: parameters.goal,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteSprint<T = any>(parameters: Parameters.DeleteSprint, callback: Callback<T>): Promise<void>;
  async deleteSprint<T = any>(parameters: Parameters.DeleteSprint, callback?: undefined): Promise<T>;
  async deleteSprint<T = any>(parameters: Parameters.DeleteSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuesForSprint<T = any>(parameters: Parameters.GetIssuesForSprint, callback: Callback<T>): Promise<void>;
  async getIssuesForSprint<T = any>(parameters: Parameters.GetIssuesForSprint, callback?: undefined): Promise<T>;
  async getIssuesForSprint<T = any>(parameters: Parameters.GetIssuesForSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveIssuesToSprintAndRank<T = any>(parameters: Parameters.MoveIssuesToSprintAndRank, callback: Callback<T>): Promise<void>;
  async moveIssuesToSprintAndRank<T = any>(parameters: Parameters.MoveIssuesToSprintAndRank, callback?: undefined): Promise<T>;
  async moveIssuesToSprintAndRank<T = any>(parameters: Parameters.MoveIssuesToSprintAndRank, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
        rankBeforeIssue: parameters.rankBeforeIssue,
        rankAfterIssue: parameters.rankAfterIssue,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getPropertiesKeys<T = any>(parameters: Parameters.GetPropertiesKeys, callback: Callback<T>): Promise<void>;
  async getPropertiesKeys<T = any>(parameters: Parameters.GetPropertiesKeys, callback?: undefined): Promise<T>;
  async getPropertiesKeys<T = any>(parameters: Parameters.GetPropertiesKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProperty<T = any>(parameters: Parameters.GetProperty, callback: Callback<T>): Promise<void>;
  async getProperty<T = any>(parameters: Parameters.GetProperty, callback?: undefined): Promise<T>;
  async getProperty<T = any>(parameters: Parameters.GetProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setProperty<T = any>(parameters: Parameters.SetProperty, callback: Callback<T>): Promise<void>;
  async setProperty<T = any>(parameters: Parameters.SetProperty, callback?: undefined): Promise<T>;
  async setProperty<T = any>(parameters: Parameters.SetProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteProperty<T = any>(parameters: Parameters.DeleteProperty, callback: Callback<T>): Promise<void>;
  async deleteProperty<T = any>(parameters: Parameters.DeleteProperty, callback?: undefined): Promise<T>;
  async deleteProperty<T = any>(parameters: Parameters.DeleteProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async swapSprint<T = any>(parameters: Parameters.SwapSprint, callback: Callback<T>): Promise<void>;
  async swapSprint<T = any>(parameters: Parameters.SwapSprint, callback?: undefined): Promise<T>;
  async swapSprint<T = any>(parameters: Parameters.SwapSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/sprint/${parameters.sprintId}/swap`,
      method: 'POST',
      data: {
        sprintToSwapWith: parameters.sprintToSwapWith,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
