import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCommentProperties {
  constructor(private client: Client) { }
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback: Callback<T>): Promise<void>;
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback?: undefined): Promise<T>;
  async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetCommentPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback: Callback<T>): Promise<void>;
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback?: undefined): Promise<T>;
  async getCommentProperty<T = Models.EntityProperty>(parameters: Parameters.GetCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setCommentProperty<T = any>(parameters: Parameters.SetCommentProperty, callback: Callback<T>): Promise<void>;
  async setCommentProperty<T = any>(parameters: Parameters.SetCommentProperty, callback?: undefined): Promise<T>;
  async setCommentProperty<T = any>(parameters: Parameters.SetCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback: Callback<T>): Promise<void>;
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback?: undefined): Promise<T>;
  async deleteCommentProperty<T = void>(parameters: Parameters.DeleteCommentProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
