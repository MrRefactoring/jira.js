import { z } from 'zod';
import { apiObject } from '#/core';

export const EstimateIssueForBoardSchema = apiObject({
  fieldId: z.string().optional(),
  value: z.number().optional(),
});

export type EstimateIssueForBoard = z.infer<typeof EstimateIssueForBoardSchema>;
