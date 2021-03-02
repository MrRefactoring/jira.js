import { ScreenID } from './screenID';
import { WorkflowRules } from './workflowRules';

/**
 * Details of a workflow transition. */
export interface Transition {
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The description of the transition. */
  description: string;
  /** The statuses the transition can start from. */
  from: string[];
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: string;
  screen?: ScreenID;
  rules?: WorkflowRules;
}
