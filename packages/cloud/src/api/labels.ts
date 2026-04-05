import { PageStringSchema, type PageString } from '#/models/pageString';
import { type GetAllLabels } from '#/parameters/getAllLabels';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/** Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of labels. */
export async function getAllLabels(client: Client, parameters?: GetAllLabels): Promise<PageString> {
  const config: SendRequestOptions<PageString> = {
    url: '/rest/api/3/label',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageStringSchema,
  };

  return await client.sendRequest(config);
}
