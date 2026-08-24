import { ColumnItemSchema, type ColumnItem } from '../models/columnItem';
import type { SetIssueNavigatorDefaultColumns } from '../parameters/setIssueNavigatorDefaultColumns';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns the default issue navigator columns.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueNavigatorDefaultColumns(client: Client, options?: RequestOptions): Promise<ColumnItem[]> {
  const config: SendRequestOptions<ColumnItem[]> = {
    url: '/rest/api/3/settings/columns',
    method: 'GET',
    schema: z.array(ColumnItemSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default issue navigator columns.
 *
 * The `columns` parameter accepts a navigable field value and is expressed as HTML form data. To specify multiple
 * columns, pass multiple `columns` parameters. For example, in curl:
 *
 * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/settings/columns`
 *
 * If no column details are sent, then all default columns are removed.
 *
 * A navigable field is one that can be used as a column on the issue navigator. Find details of navigable issue columns
 * using [Get
 * fields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-get).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setIssueNavigatorDefaultColumns(
  client: Client,
  parameters: SetIssueNavigatorDefaultColumns,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/settings/columns',
    method: 'PUT',
    body: {
      columns: parameters.columns,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
