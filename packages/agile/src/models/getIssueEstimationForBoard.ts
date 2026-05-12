import { z } from 'zod';

export const GetIssueEstimationForBoardSchema = z.object({
  fieldId: z.string().optional(),
  value: z.number().optional(),
});

export type GetIssueEstimationForBoard = z.infer<typeof GetIssueEstimationForBoardSchema>;
