import { z } from 'zod';
import { FieldEditSchema } from '../models';

export const EstimateIssueForBoardSchema = z.object(FieldEditSchema.shape).extend({
  /** The Id or key of the requested issue. */
  issueIdOrKey: z.string(),
  /** The id of the board required to determine which field is used for estimation. */
  boardId: z.number().optional(),
});

export type EstimateIssueForBoard = z.input<typeof EstimateIssueForBoardSchema>;
