import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * The payload for creating a workflow scheme. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow-scheme
 */
export interface WorkflowSchemePayload {
  defaultWorkflow?: ProjectCreateResourceIdentifier;
  /** The description of the workflow scheme */
  description?: string;
  /** Association between issuetypes and workflows */
  explicitMappings?: {};
  /** The name of the workflow scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
}
