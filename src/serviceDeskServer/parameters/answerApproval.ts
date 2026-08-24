import { z } from 'zod';
import { ApprovalDecisionRequestSchema } from '../models';

export const AnswerApprovalSchema = z.object(ApprovalDecisionRequestSchema.shape).extend({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The id of the approval. */
  approvalId: z.string(),
});

export type AnswerApproval = z.input<typeof AnswerApprovalSchema>;
