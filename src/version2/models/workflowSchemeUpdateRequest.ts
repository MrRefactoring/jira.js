import type { MappingsByIssueTypeOverride } from './mappingsByIssueTypeOverride';
import type { MappingsByWorkflow } from './mappingsByWorkflow';
import type { DocumentVersion } from './documentVersion';
import type { WorkflowSchemeAssociation } from './workflowSchemeAssociation';

/** The update workflow scheme payload. */
export interface WorkflowSchemeUpdateRequest {
  /**
   * The ID of the workflow for issue types without having a mapping defined in this workflow scheme. Only used in
   * global-scoped workflow schemes. If the `defaultWorkflowId` isn't specified, this is set to _Jira Workflow (jira)_.
   */
  defaultWorkflowId?: string;
  /** The new description for this workflow scheme. */
  description: string;
  /** The ID of this workflow scheme. */
  id: string;
  /** The new name for this workflow scheme. */
  name: string;
  /**
   * Overrides, for the selected issue types, any status mappings provided in `statusMappingsByWorkflows`. Status
   * mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow
   * has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and
   * `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByIssueTypeOverride?: MappingsByIssueTypeOverride[];
  /**
   * The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't
   * contain all statuses that the old workflow has. Status mappings can be provided by a combination of
   * `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.
   */
  statusMappingsByWorkflows?: MappingsByWorkflow[];
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes?: WorkflowSchemeAssociation[];
}
