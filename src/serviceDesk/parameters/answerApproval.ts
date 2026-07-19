import { z } from 'zod';
import { ApprovalDecisionRequestSchema } from '../models';

export const AnswerApprovalSchema = z
  .object({
    /** The ID or key of the customer request to be updated. */
    issueIdOrKey: z.string(),
    /** The ID of the approval to be updated. */
    approvalId: z.number(),
  })
  .extend(ApprovalDecisionRequestSchema.shape);

export type AnswerApproval = z.input<typeof AnswerApprovalSchema>;
