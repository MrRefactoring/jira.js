import type { WorkflowStatusLayoutPayload } from './workflowStatusLayoutPayload';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';
import type { WorkflowStatusPayload } from './workflowStatusPayload';
import type { TransitionPayload } from './transitionPayload';

/**
 * The payload for creating workflow, see
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post
 */
export interface WorkflowPayload {
  /** The description of the workflow */
  description?: string;
  loopedTransitionContainerLayout?: WorkflowStatusLayoutPayload;
  /** The name of the workflow */
  name?: string;
  /** The strategy to use if there is a conflict with another workflow */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
  startPointLayout?: WorkflowStatusLayoutPayload;
  /** The statuses to be used in the workflow */
  statuses?: WorkflowStatusPayload[];
  /** The transitions for the workflow */
  transitions?: TransitionPayload[];
}
