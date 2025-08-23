import { z } from 'zod';
import { AvailableWorkflowTriggerTypesSchema } from './availableWorkflowTriggerTypes';

/** The trigger rules available. */
export const AvailableWorkflowTriggersSchema = z.object({
  /** The list of available trigger types. */
  availableTypes: z.array(AvailableWorkflowTriggerTypesSchema),
  /** The rule key of the rule. */
  ruleKey: z.string(),
});

export type AvailableWorkflowTriggers = z.infer<typeof AvailableWorkflowTriggersSchema>;
