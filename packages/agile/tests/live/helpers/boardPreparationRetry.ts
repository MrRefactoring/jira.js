import { buildPreparationFailure } from './boardPreparationError';

interface BoardPreparationRetryOptions<TBoard, TResult> {
  operation: string;
  attempts: number;
  createBoard: () => Promise<TBoard>;
  destroyBoard: (board: TBoard) => Promise<void>;
  probe: (board: TBoard) => Promise<TResult>;
}

export async function withBoardPreparationRetries<TBoard, TResult>(
  options: BoardPreparationRetryOptions<TBoard, TResult>,
): Promise<TResult> {
  let lastError: unknown;

  for (let attempt = 0; attempt < options.attempts; attempt++) {
    const board = await options.createBoard();

    try {
      return await options.probe(board);
    } catch (error) {
      lastError = error;
      await options.destroyBoard(board);
    }
  }

  throw buildPreparationFailure(options.operation, options.attempts, lastError);
}
