import type { MoveIssuesToBacklog } from '../parameters/moveIssuesToBacklog';
import type { MoveIssuesToBacklogForBoard } from '../parameters/moveIssuesToBacklogForBoard';
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

/**
 * Move issues to the backlog of a particular board (if they are already on that board). This operation is equivalent to
 * remove future and active sprints from a given set of issues if the board has sprints If the board does not have
 * sprints this will put the issues back into the backlog from the board. At most 50 issues may be moved at once.
 */
export async function moveIssuesToBacklogForBoard(
  client: Client,
  parameters: MoveIssuesToBacklogForBoard,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/backlog/${parameters.boardId}/issue`,
    method: 'POST',
    body: {
      issues: parameters.issues,
      rankAfterIssue: parameters.rankAfterIssue,
      rankBeforeIssue: parameters.rankBeforeIssue,
      rankCustomFieldId: parameters.rankCustomFieldId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
