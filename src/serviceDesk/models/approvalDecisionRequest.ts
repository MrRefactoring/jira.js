import { z } from 'zod';
import { apiObject } from '#/core';

export const ApprovalDecisionRequestSchema = apiObject({
  /** Response to the approval request. */
  decision: z.enum(['approve', 'decline']).optional(),
});

export type ApprovalDecisionRequest = z.infer<typeof ApprovalDecisionRequestSchema>;
