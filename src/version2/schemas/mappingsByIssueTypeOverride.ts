import { z } from 'zod';
import { WorkflowAssociationStatusMappingSchema } from './workflowAssociationStatusMapping';

/**
 * Overrides, for the selected issue types, any status mappings provided in `statusMappingsByWorkflows`. Status mappings
 * are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status
 * mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
 */
export const MappingsByIssueTypeOverrideSchema = z.object({
  /** The ID of the issue type for this mapping. */
  issueTypeId: z.string(),
  /** The list of status mappings. */
  statusMappings: z.array(WorkflowAssociationStatusMappingSchema),
});

export type MappingsByIssueTypeOverride = z.infer<typeof MappingsByIssueTypeOverrideSchema>;
