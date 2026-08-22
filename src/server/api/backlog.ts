import type { MoveIssuesToBacklog } from '../parameters/moveIssuesToBacklog';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Move issues to the backlog. This operation is equivalent to remove future and active sprints from a given set of
 * issues. At most 50 issues may be moved at once.
 */
export async function moveIssuesToBacklog(
  client: Client,
  parameters: MoveIssuesToBacklog,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/backlog/issue',
    method: 'POST',
    body: {
      issues: parameters.issues,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
