import { z } from 'zod';

/** Contains details about a version approver. */
export const VersionApproverSchema = z.object({
  /** The Atlassian account ID of the approver. */
  accountId: z.string().optional(),
  /** A description of why the user is declining the approval. */
  declineReason: z.string().optional(),
  /** A description of what the user is approving within the specified version. */
  description: z.string().optional(),
  /** The status of the approval, which can be _PENDING_, _APPROVED_, or _DECLINED_ */
  status: z.string().optional(),
});

export type VersionApprover = z.infer<typeof VersionApproverSchema>;
