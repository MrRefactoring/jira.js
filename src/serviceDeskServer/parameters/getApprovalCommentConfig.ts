import { z } from 'zod';

export const GetApprovalCommentConfigSchema = z.object({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The id of the approval. */
  approvalId: z.string(),
});

export type GetApprovalCommentConfig = z.input<typeof GetApprovalCommentConfigSchema>;
