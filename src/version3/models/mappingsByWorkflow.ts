import type { WorkflowAssociationStatusMapping } from './workflowAssociationStatusMapping';

/**
 * The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't
 * contain all statuses that the old workflow has. Status mappings can be provided by a combination of
 * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
 */
export interface MappingsByWorkflow {
  /** The ID of the new workflow. */
  newWorkflowId: string;
  /** The ID of the old workflow. */
  oldWorkflowId: string;
  /** The list of status mappings. */
  statusMappings: WorkflowAssociationStatusMapping[];
}
