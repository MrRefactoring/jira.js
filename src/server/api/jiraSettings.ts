import { ColumnOptionsSchema, type ColumnOptions } from '../models/columnOptions';
import type { SetBaseURL } from '../parameters/setBaseURL';
import type { SetIssueNavigatorDefaultColumnsForm } from '../parameters/setIssueNavigatorDefaultColumnsForm';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Sets the base URL that is configured for this Jira instance. */
export async function setBaseURL(client: Client, parameters: SetBaseURL, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/settings/baseUrl',
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the default system columns for issue navigator. Admin permission will be required. */
export async function getIssueNavigatorDefaultColumns(
  client: Client,
  options?: RequestOptions,
): Promise<ColumnOptions[]> {
  const config: SendRequestOptions<ColumnOptions[]> = {
    url: '/rest/api/2/settings/columns',
    method: 'GET',
    schema: z.array(ColumnOptionsSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Sets the default system columns for issue navigator. Admin permission will be required. */
export async function setIssueNavigatorDefaultColumnsForm(
  client: Client,
  parameters: SetIssueNavigatorDefaultColumnsForm,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/settings/columns',
    method: 'PUT',
    body: {
      columns: parameters.columns,
    },
    contentType: 'application/x-www-form-urlencoded',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
