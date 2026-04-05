import { z } from 'zod';

/** Trigger configuration for workflow transitions. */
export const PreviewTriggerSchema = z.object({
  /** The ID of the trigger. */
  id: z.string().optional(),
  /** The key of the trigger rule. */
  ruleKey: z.string().optional(),
});

export type PreviewTrigger = z.infer<typeof PreviewTriggerSchema>;
