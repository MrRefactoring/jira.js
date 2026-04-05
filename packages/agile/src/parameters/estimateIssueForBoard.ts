import { z } from 'zod';

export const EstimateIssueForBoardSchema = z.object({
  /** The ID or key of the requested issue. */
  issueIdOrKey: z.string(),
  /** The ID of the board required to determine which field is used for estimation. */
  boardId: z.number().optional(),
  value: z.string().optional(),
});

export type EstimateIssueForBoard = z.input<typeof EstimateIssueForBoardSchema>;
