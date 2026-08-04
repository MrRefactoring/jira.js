import { z } from 'zod';

export const MoveIssuesToBacklogForBoardSchema = z.object({
  boardId: z.number(),
  issues: z.array(z.string()),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type MoveIssuesToBacklogForBoard = z.input<typeof MoveIssuesToBacklogForBoardSchema>;
