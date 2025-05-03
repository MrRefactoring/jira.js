import type { TransitionScreenDetails } from './transitionScreenDetails';
import type { WorkflowRules } from './workflowRules';

/** Details of a workflow transition. */
export interface Transition {
  /** The description of the transition. */
  description: string;
  /** The statuses the transition can start from. */
  from: string[];
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The properties of the transition. */
  properties?: unknown;
  rules?: WorkflowRules;
  screen?: TransitionScreenDetails;
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: string;
}
