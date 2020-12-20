import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueComments {
  constructor(private client: Client) { }
  async getCommentsByIds<T = Models.PageBeanComment>(parameters?: Parameters.GetCommentsByIds, callback?: Callback<T>): Promise<void>;
  async getCommentsByIds<T = Models.PageBeanComment>(parameters?: Parameters.GetCommentsByIds, callback?: undefined): Promise<T>;
  async getCommentsByIds<T = Models.PageBeanComment>(parameters?: Parameters.GetCommentsByIds, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/comment/list',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback: Callback<T>): Promise<void>;
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback?: undefined): Promise<T>;
  async getComments<T = Models.PageOfComments>(parameters: Parameters.GetComments, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addComment<T = any>(parameters: Parameters.AddComment, callback: Callback<T>): Promise<void>;
  async addComment<T = any>(parameters: Parameters.AddComment, callback?: undefined): Promise<T>;
  async addComment<T = any>(parameters: Parameters.AddComment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback: Callback<T>): Promise<void>;
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: undefined): Promise<T>;
  async getComment<T = Models.Comment>(parameters: Parameters.GetComment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback: Callback<T>): Promise<void>;
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback?: undefined): Promise<T>;
  async updateComment<T = Models.Comment>(parameters: Parameters.UpdateComment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteComment<T = any>(parameters: Parameters.DeleteComment, callback: Callback<T>): Promise<void>;
  async deleteComment<T = any>(parameters: Parameters.DeleteComment, callback?: undefined): Promise<T>;
  async deleteComment<T = any>(parameters: Parameters.DeleteComment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
