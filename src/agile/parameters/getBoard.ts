import { z } from 'zod';

export const GetBoardSchema = z.object({
  /** The ID of the requested board. */
  boardId: z.number(),
});

export type GetBoard = z.input<typeof GetBoardSchema>;
