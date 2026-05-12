import { z } from 'zod';

export const MoveIssuesToSprintAndRankSchema = z.object({
  /** The ID of the sprint that you want to assign issues to. */
  sprintId: z.number(),
  issues: z.array(z.string()).optional(),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type MoveIssuesToSprintAndRank = z.input<typeof MoveIssuesToSprintAndRankSchema>;
