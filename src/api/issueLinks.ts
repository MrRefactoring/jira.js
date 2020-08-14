import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class IssueLinks {
  constructor(private readonly client: Sender) {}

  public async createIssueLink(
    params?: {
      type?: any;
      inwardIssue?: any;
      outwardIssue?: any;
      comment?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLink',
      method: 'POST',
      data: {
        type: params.type,
        inwardIssue: params.inwardIssue,
        outwardIssue: params.outwardIssue,
        comment: params.comment,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueLink(
    params: {
      linkId: string;
    },
    callback?: Callback,
  ): Promise<Schemas.IssueLink> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLink/${params.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueLink(
    params: {
      linkId: string;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLink/${params.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
