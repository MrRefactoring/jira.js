import { WorkflowTransitionProperty } from '../models';

export interface CreateWorkflowTransitionProperty extends WorkflowTransitionProperty {
  /**
   * The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown
   * next to the transition.
   */
  transitionId: number;
  /**
   * The key of the property being added, also known as the name of the property. Set this to the same value as the
   * `key` defined in the request body.
   */
  key: string;
  /** The name of the workflow that the transition belongs to. */
  workflowName: string;
  /**
   * The workflow status. Set to _live_ for inactive workflows or _draft_ for draft workflows. Active workflows cannot
   * be edited.
   */
  workflowMode?: string;
}
