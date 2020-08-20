import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PageBeanComment, PageOfComments, Comment, Comment } from '../schemas';
export class IssueComments {
  constructor(private readonly client: Sender) {}

  public async getCommentsByIds(
    params: {
      expand?: string;
      ids: Array<number>;
    },
    callback?: Callback<PageBeanComment>,
  ): Promise<PageBeanComment> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/comment/list',
      method: 'POST',
      params: {
        expand: params.expand,
      },
      data: {
        ids: params.ids,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getComments(
    params: {
      issueIdOrKey: string;
      startAt?: number;
      maxResults?: number;
      orderBy?: string;
      expand?: string;
    },
    callback?: Callback<PageOfComments>,
  ): Promise<PageOfComments> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/comment`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        orderBy: params.orderBy,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async addComment(
    params: {
      issueIdOrKey: string;
      expand?: string;
      self?: string;
      id?: string;
      author?: any;
      body?: string;
      renderedBody?: string;
      updateAuthor?: any;
      created?: string;
      updated?: string;
      visibility?: any;
      jsdPublic?: boolean;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/comment`,
      method: 'POST',
      params: {
        expand: params.expand,
      },
      data: { ...params, issueIdOrKey: undefined, expand: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getComment(
    params: {
      issueIdOrKey: string;
      id: string;
      expand?: string;
    },
    callback?: Callback<Comment>,
  ): Promise<Comment> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/comment/${params.id}`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateComment(
    params: {
      issueIdOrKey: string;
      id: string;
      expand?: string;
      self?: string;
      author?: any;
      body?: string;
      renderedBody?: string;
      updateAuthor?: any;
      created?: string;
      updated?: string;
      visibility?: any;
      jsdPublic?: boolean;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<Comment>,
  ): Promise<Comment> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/comment/${params.id}`,
      method: 'PUT',
      params: {
        expand: params.expand,
      },
      data: {
        ...params,
        issueIdOrKey: undefined,
        id: undefined,
        expand: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteComment(
    params: {
      issueIdOrKey: string;
      id: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/comment/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
