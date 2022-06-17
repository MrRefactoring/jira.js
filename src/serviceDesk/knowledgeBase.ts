import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class KnowledgeBase {
  constructor(private client: Client) {}

  /**
   * Returns articles which match the given query string across all service desks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the [customer
   * portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
   */
  async getArticles<T = Models.PagedArticle>(parameters: Parameters.GetArticles, callback: Callback<T>): Promise<void>;
  /**
   * Returns articles which match the given query string across all service desks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the [customer
   * portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
   */
  async getArticles<T = Models.PagedArticle>(parameters: Parameters.GetArticles, callback?: never): Promise<T>;
  async getArticles<T = Models.PagedArticle>(
    parameters: Parameters.GetArticles,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/knowledgebase/article',
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      params: {
        query: parameters.query,
        highlight: parameters.highlight,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
