import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Epic {
  constructor(private client: Client) { }
  async getIssuesWithoutEpic<T = any>(parameters?: Parameters.GetIssuesWithoutEpic, callback?: Callback<T>): Promise<void>;
  async getIssuesWithoutEpic<T = any>(parameters?: Parameters.GetIssuesWithoutEpic, callback?: undefined): Promise<T>;
  async getIssuesWithoutEpic<T = any>(parameters?: Parameters.GetIssuesWithoutEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/epic/none/issue',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        jql: parameters?.jql,
        validateQuery: parameters?.validateQuery,
        fields: parameters?.fields,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeIssuesFromEpic<T = void>(parameters?: Parameters.RemoveIssuesFromEpic, callback?: Callback<T>): Promise<void>;
  async removeIssuesFromEpic<T = void>(parameters?: Parameters.RemoveIssuesFromEpic, callback?: undefined): Promise<T>;
  async removeIssuesFromEpic<T = void>(parameters?: Parameters.RemoveIssuesFromEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/epic/none/issue',
      method: 'POST',
      data: {
        issues: parameters?.issues,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async searchEpics<T = any>(parameters?: Parameters.SearchEpics, callback?: Callback<T>): Promise<void>;
  async searchEpics<T = any>(parameters?: Parameters.SearchEpics, callback?: undefined): Promise<T>;
  async searchEpics<T = any>(parameters?: Parameters.SearchEpics, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/epic/search',
      method: 'GET',
      params: {
        maxResults: parameters?.maxResults,
        excludeDone: parameters?.excludeDone,
        query: parameters?.query,
        projectKey: parameters?.projectKey,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getEpic<T = any>(parameters: Parameters.GetEpic, callback: Callback<T>): Promise<void>;
  async getEpic<T = any>(parameters: Parameters.GetEpic, callback?: undefined): Promise<T>;
  async getEpic<T = any>(parameters: Parameters.GetEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async partiallyUpdateEpic<T = any>(parameters: Parameters.PartiallyUpdateEpic, callback: Callback<T>): Promise<void>;
  async partiallyUpdateEpic<T = any>(parameters: Parameters.PartiallyUpdateEpic, callback?: undefined): Promise<T>;
  async partiallyUpdateEpic<T = any>(parameters: Parameters.PartiallyUpdateEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'POST',
      data: {
        name: parameters.name,
        summary: parameters.summary,
        color: parameters.color,
        done: parameters.done,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuesForEpic<T = any>(parameters: Parameters.GetIssuesForEpic, callback: Callback<T>): Promise<void>;
  async getIssuesForEpic<T = any>(parameters: Parameters.GetIssuesForEpic, callback?: undefined): Promise<T>;
  async getIssuesForEpic<T = any>(parameters: Parameters.GetIssuesForEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
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
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback: Callback<T>): Promise<void>;
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback?: undefined): Promise<T>;
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback: Callback<T>): Promise<void>;
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback?: undefined): Promise<T>;
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
      method: 'PUT',
      data: {
        rankBeforeEpic: parameters.rankBeforeEpic,
        rankAfterEpic: parameters.rankAfterEpic,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
