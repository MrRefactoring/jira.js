import { z } from 'zod';

export const GetApprovalByIdSchema = z.object({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The id of the approval. */
  approvalId: z.string(),
});

export type GetApprovalById = z.input<typeof GetApprovalByIdSchema>;
