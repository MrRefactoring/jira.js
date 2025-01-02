import { DocumentVersion } from './documentVersion.mjs';
import { StatusLayoutUpdate } from './statusLayoutUpdate.mjs';
import { StatusMappingDTO } from './statusMappingDTO.mjs';
import { StatusMigration } from './statusMigration.mjs';
import { TransitionUpdateDTO } from './transitionUpdateDTO.mjs';
import { WorkflowLayout } from './workflowLayout.mjs';

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
