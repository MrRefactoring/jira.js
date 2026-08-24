import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ApprovalDecisionRequestSchema = apiObject({
  decision: openEnum(['approve', 'decline']).optional(),
  comment: z.string().optional(),
  commentPublic: z.boolean().optional(),
});

export type ApprovalDecisionRequest = z.infer<typeof ApprovalDecisionRequestSchema>;
