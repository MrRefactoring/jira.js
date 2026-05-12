import { z } from 'zod';

export const MoveIssuesToBoardSchema = z.object({
  boardId: z.number(),
  issues: z.array(z.string()).optional(),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type MoveIssuesToBoard = z.input<typeof MoveIssuesToBoardSchema>;
