import { z } from 'zod';
import { WorkflowAssociationStatusMappingSchema } from './workflowAssociationStatusMapping';

/**
 * The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't
 * contain all statuses that the old workflow has. Status mappings can be provided by a combination of
 * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
 */
export const MappingsByWorkflowSchema = z.object({
  /** The ID of the new workflow. */
  newWorkflowId: z.string(),
  /** The ID of the old workflow. */
  oldWorkflowId: z.string(),
  /** The list of status mappings. */
  statusMappings: z.array(WorkflowAssociationStatusMappingSchema),
});

export type MappingsByWorkflow = z.infer<typeof MappingsByWorkflowSchema>;
