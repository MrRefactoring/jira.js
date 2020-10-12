import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { Votes as VotesResponse } from '../../models/v2';

export class IssueVotes {
  constructor(private readonly client: Client) { }

  async getVotes(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<VotesResponse>): Promise<VotesResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addVote(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeVote(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
