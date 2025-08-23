import { z } from 'zod';
import { MappingsByIssueTypeOverrideSchema } from './mappingsByIssueTypeOverride';
import { MappingsByWorkflowSchema } from './mappingsByWorkflow';
import { DocumentVersionSchema } from './documentVersion';
import { WorkflowSchemeAssociationSchema } from './workflowSchemeAssociation';

/** The update workflow scheme payload. */
export const WorkflowSchemeUpdateRequestSchema = z.object({
  /**
   * The ID of the workflow for issue types without having a mapping defined in this workflow scheme. Only used in
   * global-scoped workflow schemes. If the `defaultWorkflowId` isn't specified, this is set to _Jira Workflow (jira)_.
   */
  defaultWorkflowId: z.string().optional(),
  /** The new description for this workflow scheme. */
  description: z.string(),
  /** The ID of this workflow scheme. */
  id: z.string(),
  /** The new name for this workflow scheme. */
  name: z.string(),
  /**
   * Overrides, for the selected issue types, any status mappings provided in `statusMappingsByWorkflows`. Status
   * mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow
   * has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and
   * `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByIssueTypeOverride: z.array(MappingsByIssueTypeOverrideSchema).optional(),
  /**
   * The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't
   * contain all statuses that the old workflow has. Status mappings can be provided by a combination of
   * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByWorkflows: z.array(MappingsByWorkflowSchema).optional(),
  version: DocumentVersionSchema,
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: z.array(WorkflowSchemeAssociationSchema).optional(),
});

export type WorkflowSchemeUpdateRequest = z.infer<typeof WorkflowSchemeUpdateRequestSchema>;
