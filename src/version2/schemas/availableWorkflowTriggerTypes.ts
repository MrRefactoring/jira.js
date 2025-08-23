import { z } from 'zod';

/** The list of available trigger types. */
export const AvailableWorkflowTriggerTypesSchema = z.object({
  /** The description of the trigger rule. */
  description: z.string().optional(),
  /** The name of the trigger rule. */
  name: z.string().optional(),
  /** The type identifier of trigger rule. */
  type: z.string().optional(),
});

export type AvailableWorkflowTriggerTypes = z.infer<typeof AvailableWorkflowTriggerTypesSchema>;
