import { z } from 'zod';

export const GetReportsForBoardSchema = z.object({
  boardId: z.number(),
});

export type GetReportsForBoard = z.input<typeof GetReportsForBoardSchema>;
