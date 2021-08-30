import { CreateWorkflowCondition } from './createWorkflowCondition';
import { CreateWorkflowTransitionRule } from './createWorkflowTransitionRule';

/** The details of a workflow transition rules. */
export interface CreateWorkflowTransitionRulesDetails {
  conditions?: CreateWorkflowCondition;
  /** The workflow validators. */
  validators?: CreateWorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions?: CreateWorkflowTransitionRule[];
}
