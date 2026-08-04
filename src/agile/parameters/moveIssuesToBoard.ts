import { z } from 'zod';
import { IssueRankRequestSchema } from '../models';

export const MoveIssuesToBoardSchema = z.object({}).extend(IssueRankRequestSchema.shape).extend({
  boardId: z.number(),
});

export type MoveIssuesToBoard = z.input<typeof MoveIssuesToBoardSchema>;
