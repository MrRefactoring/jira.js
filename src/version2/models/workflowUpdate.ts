import type { DocumentVersion } from './documentVersion.js';
import type { StatusLayoutUpdate } from './statusLayoutUpdate.js';
import type { StatusMappingDTO } from './statusMappingDTO.js';
import type { StatusMigration } from './statusMigration.js';
import type { TransitionUpdateDTO } from './transitionUpdateDTO.js';
import type { WorkflowLayout } from './workflowLayout.js';

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
