import { z } from 'zod';
import { IssueRankRequestSchema } from '../models';

export const MoveIssuesToBoardSchema = z.object(IssueRankRequestSchema.shape).extend({
  boardId: z.number(),
});

export type MoveIssuesToBoard = z.input<typeof MoveIssuesToBoardSchema>;
