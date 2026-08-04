import { PagedArticleSchema, type PagedArticle } from '../models/pagedArticle';
import type { GetArticles } from '../parameters/getArticles';
import type { ViewArticle } from '../parameters/viewArticle';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns articles which match the given query string across all service desks.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the [customer
 * portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
 */

export async function getArticles(client: Client, parameters: GetArticles): Promise<PagedArticle> {
  const config: SendRequestOptions<PagedArticle> = {
    url: '/rest/servicedeskapi/knowledgebase/article',
    method: 'GET',
    searchParams: {
      query: parameters.query,
      highlight: parameters.highlight,
      start: parameters.start,
      limit: parameters.limit,
      cursor: parameters.cursor,
      prev: parameters.prev,
    },
    schema: PagedArticleSchema,
  };

  return await client.sendRequest(config);
}

export async function viewArticle(client: Client, parameters: ViewArticle): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: `/rest/servicedeskapi/knowledgebase/article/view/${parameters.pageId}`,
    method: 'GET',
    schema: z.string(),
  };

  return await client.sendRequest(config);
}
