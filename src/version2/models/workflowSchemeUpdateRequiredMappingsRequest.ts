import type { WorkflowSchemeAssociation } from './workflowSchemeAssociation';

/** The request payload to get the required mappings for updating a workflow scheme. */
export interface WorkflowSchemeUpdateRequiredMappingsRequest {
  /**
   * The ID of the new default workflow for this workflow scheme. Only used in global-scoped workflow schemes. If it
   * isn't specified, is set to _Jira Workflow (jira)_.
   */
  defaultWorkflowId?: string;
  /** The ID of the workflow scheme. */
  id: string;
  /** The new workflow to issue type mappings for this workflow scheme. */
  workflowsForIssueTypes: WorkflowSchemeAssociation[];
}
