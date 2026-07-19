import { z } from 'zod';

export const GetApprovalByIdSchema = z.object({
  /** The ID or key of the customer request the approval is on. */
  issueIdOrKey: z.string(),
  /** The ID of the approval to be returned. */
  approvalId: z.number(),
});

export type GetApprovalById = z.input<typeof GetApprovalByIdSchema>;
