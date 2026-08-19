import { z } from 'zod';
import { IssueRankRequestSchema } from '../models';

export const MoveIssuesToSprintAndRankSchema = z.object(IssueRankRequestSchema.shape).extend({
  /** The ID of the sprint that you want to assign issues to. */
  sprintId: z.number(),
});

export type MoveIssuesToSprintAndRank = z.input<typeof MoveIssuesToSprintAndRankSchema>;
