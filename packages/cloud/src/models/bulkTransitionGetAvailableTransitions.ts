import { z } from 'zod';
import { IssueBulkTransitionForWorkflowSchema } from '#/models/issueBulkTransitionForWorkflow';

/** Bulk Transition Get Available Transitions Response. */
export const BulkTransitionGetAvailableTransitionsSchema = z.object({
  /** List of available transitions for bulk transition operation for requested issues grouped by workflow */
  availableTransitions: z.array(IssueBulkTransitionForWorkflowSchema).optional(),
  /** The end cursor for use in pagination. */
  endingBefore: z.string().optional(),
  /** The start cursor for use in pagination. */
  startingAfter: z.string().optional(),
});

export type BulkTransitionGetAvailableTransitions = z.infer<typeof BulkTransitionGetAvailableTransitionsSchema>;
