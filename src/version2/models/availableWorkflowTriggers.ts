import type { AvailableWorkflowTriggerTypes } from './availableWorkflowTriggerTypes.js';

/** The trigger rules available. */
export interface AvailableWorkflowTriggers {
  /** The list of available trigger types. */
  availableTypes: AvailableWorkflowTriggerTypes[];
  /** The rule key of the rule. */
  ruleKey: string;
}
