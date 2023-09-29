import { DocumentVersion } from './documentVersion';
import { StatusLayoutUpdate } from './statusLayoutUpdate';
import { StatusMappingDTO } from './statusMappingDTO';
import { StatusMigration } from './statusMigration';
import { TransitionUpdateDTO } from './transitionUpdateDTO';
import { WorkflowLayout } from './workflowLayout';

/** The details of the workflows to update. */
export interface WorkflowUpdate {
  /** The mapping of old to new status ID. */
  defaultStatusMappings?: StatusMigration[];
  /** The new description for this workflow. */
  description?: string;
  /** The ID of this workflow. */
  id: string;
  startPointLayout?: WorkflowLayout;
  /** The mapping of old to new status ID for a specific project and issue type. */
  statusMappings?: StatusMappingDTO[];
  /** The statuses associated with this workflow. */
  statuses: StatusLayoutUpdate[];
  /** The transitions of this workflow. */
  transitions: TransitionUpdateDTO[];
  version: DocumentVersion;
}
