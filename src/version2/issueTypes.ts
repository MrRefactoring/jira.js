import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypes {
  constructor(private client: Client) { }
  async getIssueAllTypes<T = any>(callback?: Callback<T>): Promise<void>;
  async getIssueAllTypes<T = any>(callback?: undefined): Promise<T>;
  async getIssueAllTypes<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetype',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueType<T = any>(callback?: Callback<T>): Promise<void>;
  async createIssueType<T = any>(callback?: undefined): Promise<T>;
  async createIssueType<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuetype',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback: Callback<T>): Promise<void>;
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback?: undefined): Promise<T>;
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback: Callback<T>): Promise<void>;
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback?: undefined): Promise<T>;
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueType<T = any>(parameters: Parameters.DeleteIssueType, callback: Callback<T>): Promise<void>;
  async deleteIssueType<T = any>(parameters: Parameters.DeleteIssueType, callback?: undefined): Promise<T>;
  async deleteIssueType<T = any>(parameters: Parameters.DeleteIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'DELETE',
      params: {
        alternativeIssueTypeId: parameters.alternativeIssueTypeId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAlternativeIssueTypes<T = any>(parameters: Parameters.GetAlternativeIssueTypes, callback: Callback<T>): Promise<void>;
  async getAlternativeIssueTypes<T = any>(parameters: Parameters.GetAlternativeIssueTypes, callback?: undefined): Promise<T>;
  async getAlternativeIssueTypes<T = any>(parameters: Parameters.GetAlternativeIssueTypes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetype/${parameters.id}/alternatives`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createIssueTypeAvatar<T = any>(parameters: Parameters.CreateIssueTypeAvatar, callback: Callback<T>): Promise<void>;
  async createIssueTypeAvatar<T = any>(parameters: Parameters.CreateIssueTypeAvatar, callback?: undefined): Promise<T>;
  async createIssueTypeAvatar<T = any>(parameters: Parameters.CreateIssueTypeAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuetype/${parameters.id}/avatar2`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
