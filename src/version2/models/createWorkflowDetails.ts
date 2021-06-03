import { CreateWorkflowTransitionDetails } from './createWorkflowTransitionDetails';
import { CrateWorkflowStatusDetails } from './crateWorkflowStatusDetails';

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
   * - Include one *initial* transition.
   * - Not use the same name for a *global* and *directed* transition.
   * - Have a unique name for each *global* transition.
   * - Have a unique 'to' status for each *global* transition.
   * - Have unique names for each transition from a status.
   * - Not have a 'from' status on *initial* and *global* transitions.
   * - Have a 'from' status on *directed* transitions.
   *
   * All the transition statuses must be included in `statuses`.
   */
  transitions: CreateWorkflowTransitionDetails[];
  /** The statuses of the workflow. Any status that does not include a transition is added to the workflow without a transition. */
  statuses: CrateWorkflowStatusDetails[];
}
