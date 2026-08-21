import { z } from 'zod';

export const GetIssueEstimationForBoardSchema = z.object({
  /** The Id or key of the requested issue. */
  issueIdOrKey: z.string(),
  /** The id of the board required to determine which field is used for estimation. */
  boardId: z.number().optional(),
});

export type GetIssueEstimationForBoard = z.input<typeof GetIssueEstimationForBoardSchema>;
