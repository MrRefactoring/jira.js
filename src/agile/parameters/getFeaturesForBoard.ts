import { z } from 'zod';

export const GetFeaturesForBoardSchema = z.object({
  boardId: z.number(),
});

export type GetFeaturesForBoard = z.input<typeof GetFeaturesForBoardSchema>;
