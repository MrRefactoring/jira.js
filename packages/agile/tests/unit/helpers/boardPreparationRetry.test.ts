import { describe, expect, it } from 'vitest';
import { withBoardPreparationRetries } from '../../live/helpers/boardPreparationRetry';

describe('withBoardPreparationRetries', () => {
  it('returns probe result and destroys only failed boards', async () => {
    const created: Array<{ boardId: number }> = [];
    const destroyed: number[] = [];
    let probeCall = 0;

    const result = await withBoardPreparationRetries({
      operation: 'moveIssuesToBoard',
      attempts: 3,
      createBoard: async () => {
        const board = { boardId: created.length + 1 };
        created.push(board);
        return board;
      },
      destroyBoard: async board => {
        destroyed.push(board.boardId);
      },
      probe: async board => {
        probeCall += 1;

        if (probeCall === 1) {
          throw new Error('first failure');
        }

        return { board, state: 'ready' as const };
      },
    });

    expect(result).toEqual({ board: { boardId: 2 }, state: 'ready' });
    expect(destroyed).toEqual([1]);
  });

  it('throws a preparation failure with last error details', async () => {
    await expect(
      withBoardPreparationRetries({
        operation: 'toggleFeatures',
        attempts: 2,
        createBoard: async () => ({ boardId: 1 }),
        destroyBoard: async () => {},
        probe: async () => {
          throw new Error('no toggleable features');
        },
      }),
    ).rejects.toThrow('Unable to prepare board for toggleFeatures after 2 attempts');
  });
});
