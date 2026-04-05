import { z } from 'zod';

export const EstimateIssueForBoardSchema = z.object({
  fieldId: z.string().optional(),
  value: z.number().optional(),
});

export type EstimateIssueForBoard = z.infer<typeof EstimateIssueForBoardSchema>;
