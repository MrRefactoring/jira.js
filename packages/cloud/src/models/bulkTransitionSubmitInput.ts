import { z } from 'zod';

export const BulkTransitionSubmitInputSchema = z.object({
  /** List of all the issue IDs or keys that are to be bulk transitioned. */
  selectedIssueIdsOrKeys: z.array(z.string()),
  /** The ID of the transition that is to be performed on the issues. */
  transitionId: z.string(),
});

export type BulkTransitionSubmitInput = z.infer<typeof BulkTransitionSubmitInputSchema>;
