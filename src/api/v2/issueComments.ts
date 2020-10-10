import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanComment as PageBeanCommentResponse, PageOfComments as PageOfCommentsResponse, Comment as CommentResponse } from '../../models/v2';

export class IssueComments {
  constructor(private readonly client: Client) { }

  async getCommentsByIds(parameters?: {
    expand?: string;
  }, callback?: Callback<PageBeanCommentResponse>): Promise<PageBeanCommentResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/comment/list',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getComments(parameters: {
    issueIdOrKey: string;
    startAt?: number;
    maxResults?: number;
    orderBy?: string;
    expand?: string;
  }, callback?: Callback<PageOfCommentsResponse>): Promise<PageOfCommentsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addComment(parameters: {
    issueIdOrKey: string;
    expand?: string;
  }, callback?: Callback<CommentResponse>): Promise<CommentResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getComment(parameters: {
    issueIdOrKey: string;
    id: string;
    expand?: string;
  }, callback?: Callback<CommentResponse>): Promise<CommentResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateComment(parameters: {
    issueIdOrKey: string;
    id: string;
    expand?: string;
  }, callback?: Callback<CommentResponse>): Promise<CommentResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteComment(parameters: {
    issueIdOrKey: string;
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
