import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ApprovalDecisionRequestSchema = apiObject({
  /** Response to the approval request. */
  decision: openEnum(['approve', 'decline']).optional(),
});

export type ApprovalDecisionRequest = z.infer<typeof ApprovalDecisionRequestSchema>;
