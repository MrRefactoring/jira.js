import { z } from 'zod';

export const DeleteBoardSchema = z.object({
  /** ID of the board to be deleted */
  boardId: z.number(),
});

export type DeleteBoard = z.input<typeof DeleteBoardSchema>;
