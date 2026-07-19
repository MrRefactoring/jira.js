import { z } from 'zod';
import { apiObject } from '#/core';

export const GetIssueEstimationForBoardSchema = apiObject({
  fieldId: z.string().optional(),
  value: z.number().optional(),
});

export type GetIssueEstimationForBoard = z.infer<typeof GetIssueEstimationForBoardSchema>;
