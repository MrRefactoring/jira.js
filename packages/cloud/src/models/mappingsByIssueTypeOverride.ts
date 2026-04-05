import { z } from 'zod';
import { WorkflowAssociationStatusMappingSchema } from '#/models/workflowAssociationStatusMapping';

/**
 * The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to
 * another. This field is required if any statuses in the current project's workflows would no longer exist in the
 * target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status
 * in the issue’s new workflow.
 */
export const MappingsByIssueTypeOverrideSchema = z.object({
  issueTypeId: z.string().optional(),
  statusMappings: z.array(WorkflowAssociationStatusMappingSchema).optional(),
});

export type MappingsByIssueTypeOverride = z.infer<typeof MappingsByIssueTypeOverrideSchema>;
