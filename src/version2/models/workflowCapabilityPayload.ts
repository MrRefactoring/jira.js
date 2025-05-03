import type { StatusPayload } from './statusPayload';
import type { WorkflowSchemePayload } from './workflowSchemePayload';
import type { WorkflowPayload } from './workflowPayload';

/**
 * The payload for creating a workflows. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow
 */
export interface WorkflowCapabilityPayload {
  /** The statuses for the workflow */
  statuses?: StatusPayload[];
  workflowScheme?: WorkflowSchemePayload;
  /** The transitions for the workflow */
  workflows?: WorkflowPayload[];
}
