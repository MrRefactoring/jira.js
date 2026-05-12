import { z } from 'zod';

/** Approval configuration. */
export const ApprovalConfigurationPreviewSchema = z.object({
  /** The active approval configuration. */
  active: z.string().optional(),
  /** The transition ID for approved state. */
  transitionApproved: z.string().optional(),
  /** The transition ID for rejected state. */
  transitionRejected: z.string().optional(),
});

export type ApprovalConfigurationPreview = z.infer<typeof ApprovalConfigurationPreviewSchema>;
