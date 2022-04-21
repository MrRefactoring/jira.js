import { CreateWorkflowStatusDetails } from './createWorkflowStatusDetails';
import { CreateWorkflowTransitionDetails } from './createWorkflowTransitionDetails';

/** The details of a workflow. */
export interface CreateWorkflowDetails {
  /**
   * The name of the workflow. The name must be unique. The maximum length is 255 characters. Characters can be
   * separated by a whitespace but the name cannot start or end with a whitespace.
   */
  name: string;
  /** The description of the workflow. The maximum length is 1000 characters. */
  description?: string;
  /**
   * The transitions of the workflow. For the request to be valid, these transitions must:
   *
   * Include one _initial_ transition. not use the same name for a _global_ and _directed_ transition. have a unique
   * name for each _global_ transition. have a unique 'to' status for each _global_ transition. have unique names for
   * each transition from a status. not have a 'from' status on _initial_ and _global_ transitions. have a 'from' status
   * on _directed_ transitions.
   *
   * All the transition statuses must be included in `statuses`.
   */
  transitions: CreateWorkflowTransitionDetails[];
  /** The statuses of the workflow. Any status that does not include a transition is added to the workflow without a transition. */
  statuses: CreateWorkflowStatusDetails[];
}
