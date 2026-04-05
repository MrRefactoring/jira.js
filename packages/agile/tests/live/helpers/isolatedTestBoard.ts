import { z } from 'zod';
import type { Client } from '@jira.js/base';
import type { createAgileClient } from '../../../src/createAgileClient';
const FilterCreatedSchema = z.object({
  id: z.coerce.number(),
});

export interface IsolatedTestBoard {
  boardId: number;
  filterId: number;
}

export async function createIsolatedTestBoard(
  agile: ReturnType<typeof createAgileClient>,
  http: Client,
  projectKey: string,
): Promise<IsolatedTestBoard> {
  const suffix = `${Date.now()}-${globalThis.crypto.randomUUID().slice(0, 8)}`;
  const filterName = `sdk-live-filter-${suffix}`;
  const boardName = `sdk-live-board-${suffix}`;

  const filter = await http.sendRequest({
    url: '/rest/api/3/filter',
    method: 'POST',
    body: {
      name: filterName,
      jql: `project = ${projectKey} ORDER BY Rank ASC`,
    },
    schema: FilterCreatedSchema,
  });

  try {
    const board = await agile.board.createBoard({
      name: boardName,
      type: 'scrum',
      filterId: filter.id,
      location: {
        type: 'project',
        projectKeyOrId: projectKey,
      },
    });

    if (board.id == null) {
      throw new Error('createBoard returned no board id');
    }

    return { boardId: board.id, filterId: filter.id };
  } catch (e) {
    await http
      .sendRequest({
        url: `/rest/api/3/filter/${filter.id}`,
        method: 'DELETE',
      })
      .catch(() => {});

    throw e;
  }
}

export async function destroyIsolatedTestBoard(
  agile: ReturnType<typeof createAgileClient>,
  http: Client,
  isolated: IsolatedTestBoard,
): Promise<void> {
  await agile.board.deleteBoard({ boardId: isolated.boardId }).catch(() => {});

  await http
    .sendRequest({
      url: `/rest/api/3/filter/${isolated.filterId}`,
      method: 'DELETE',
    })
    .catch(() => {});
}
