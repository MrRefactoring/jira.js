import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueVotes {
  constructor(private client: Client) { }
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback: Callback<T>): Promise<void>;
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback?: undefined): Promise<T>;
  async getVotes<T = Models.Votes>(parameters: Parameters.GetVotes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addVote<T = void>(parameters: Parameters.AddVote, callback: Callback<T>): Promise<void>;
  async addVote<T = void>(parameters: Parameters.AddVote, callback?: undefined): Promise<T>;
  async addVote<T = void>(parameters: Parameters.AddVote, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback: Callback<T>): Promise<void>;
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback?: undefined): Promise<T>;
  async removeVote<T = void>(parameters: Parameters.RemoveVote, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
