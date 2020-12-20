import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueRemoteLinks {
  constructor(private client: Client) { }
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinks, callback: Callback<T>): Promise<void>;
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinks, callback?: undefined): Promise<T>;
  async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'GET',
      params: {
        globalId: parameters.globalId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: Parameters.CreateOrUpdateRemoteIssueLink, callback: Callback<T>): Promise<void>;
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: Parameters.CreateOrUpdateRemoteIssueLink, callback?: undefined): Promise<T>;
  async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: Parameters.CreateOrUpdateRemoteIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'POST',
      data: {
        globalId: parameters.globalId,
        application: parameters.application,
        relationship: parameters.relationship,
        object: parameters.object,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteRemoteIssueLinkByGlobalId<T = void>(parameters: Parameters.DeleteRemoteIssueLinkByGlobalId, callback: Callback<T>): Promise<void>;
  async deleteRemoteIssueLinkByGlobalId<T = void>(parameters: Parameters.DeleteRemoteIssueLinkByGlobalId, callback?: undefined): Promise<T>;
  async deleteRemoteIssueLinkByGlobalId<T = void>(parameters: Parameters.DeleteRemoteIssueLinkByGlobalId, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'DELETE',
      params: {
        globalId: parameters.globalId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinkById, callback: Callback<T>): Promise<void>;
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinkById, callback?: undefined): Promise<T>;
  async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: Parameters.GetRemoteIssueLinkById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateRemoteIssueLink<T = void>(parameters: Parameters.UpdateRemoteIssueLink, callback: Callback<T>): Promise<void>;
  async updateRemoteIssueLink<T = void>(parameters: Parameters.UpdateRemoteIssueLink, callback?: undefined): Promise<T>;
  async updateRemoteIssueLink<T = void>(parameters: Parameters.UpdateRemoteIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'PUT',
      data: {
        globalId: parameters.globalId,
        application: parameters.application,
        relationship: parameters.relationship,
        object: parameters.object,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteRemoteIssueLinkById<T = void>(parameters: Parameters.DeleteRemoteIssueLinkById, callback: Callback<T>): Promise<void>;
  async deleteRemoteIssueLinkById<T = void>(parameters: Parameters.DeleteRemoteIssueLinkById, callback?: undefined): Promise<T>;
  async deleteRemoteIssueLinkById<T = void>(parameters: Parameters.DeleteRemoteIssueLinkById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
