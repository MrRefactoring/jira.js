import { WorkflowScheme } from '../models';

export interface UpdateWorkflowSchemeDraft extends WorkflowScheme {
  /** The ID of the active workflow scheme that the draft was created from. */
  id: number;
}
