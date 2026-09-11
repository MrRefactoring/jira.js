import { z } from 'zod';

export const GetBoardSchema = z.object({
  /** The Id of the requested board. */
  boardId: z.number(),
});

export type GetBoard = z.input<typeof GetBoardSchema>;
