import { StatusLayoutUpdate } from './statusLayoutUpdate.mjs';
import { TransitionUpdateDTO } from './transitionUpdateDTO.mjs';
import { WorkflowLayout } from './workflowLayout.mjs';

/** The details of the workflows to create. */
export interface WorkflowCreate {
  /** The description of the workflow to create. */
  description?: string;
  /** The name of the workflow to create. */
  name: string;
  startPointLayout?: WorkflowLayout;
  /** The statuses associated with this workflow. */
  statuses: StatusLayoutUpdate[];
  /** The transitions of this workflow. */
  transitions: TransitionUpdateDTO[];
}
