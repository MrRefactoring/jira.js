import { z } from 'zod';
import { apiObject } from '#/core';

export const ApprovalConditionSchema = apiObject({
  type: z.string().optional(),
  value: z.string().optional(),
});

export type ApprovalCondition = z.infer<typeof ApprovalConditionSchema>;
