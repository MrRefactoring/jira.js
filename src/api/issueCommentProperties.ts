import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueCommentProperties {
  constructor(private readonly client: Sender) { }

  public async getCommentPropertyKeys(
    params: {
      commentId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/comment/${params.commentId}/properties`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getCommentProperty(
    params: {
      commentId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/comment/${params.commentId}/properties/${params.propertyKey}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async setCommentProperty(
    params: {
      commentId: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/comment/${params.commentId}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: { ...params, commentId: undefined, propertyKey: undefined }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteCommentProperty(
    params: {
      commentId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/comment/${params.commentId}/properties/${params.propertyKey}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }
}
