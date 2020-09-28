import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class IssueVotes {
  constructor(private readonly client: Sender) {}

  public async getVotes(
    params: {
      issueIdOrKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/votes`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async addVote(
    params: {
      issueIdOrKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/votes`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteVote(
    params: {
      issueIdOrKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/votes`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
