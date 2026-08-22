import { IssueLinkSchema, type IssueLink } from '../models/issueLink';
import type { LinkIssues } from '../parameters/linkIssues';
import type { GetIssueLink } from '../parameters/getIssueLink';
import type { DeleteIssueLink } from '../parameters/deleteIssueLink';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Creates an issue link between two issues. */
export async function linkIssues(client: Client, parameters: LinkIssues, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/issueLink',
    method: 'POST',
    body: {
      comment: parameters.comment,
      inwardIssue: parameters.inwardIssue,
      outwardIssue: parameters.outwardIssue,
      type: parameters.type,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns an issue link with the specified id. */
export async function getIssueLink(
  client: Client,
  parameters: GetIssueLink,
  options?: RequestOptions,
): Promise<IssueLink> {
  const config: SendRequestOptions<IssueLink> = {
    url: `/rest/api/2/issueLink/${parameters.linkId}`,
    method: 'GET',
    schema: IssueLinkSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes an issue link with the specified id. */
export async function deleteIssueLink(
  client: Client,
  parameters: DeleteIssueLink,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issueLink/${parameters.linkId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
