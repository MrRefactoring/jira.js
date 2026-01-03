import type { WorkflowPreviewScope } from './workflowPreviewScope';

/** Details of a status. */
export interface JiraWorkflowPreviewStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The raw name of the status. */
  rawName?: string;
  scope?: WorkflowPreviewScope;
  /** The category of the status. */
  statusCategory?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
  /** The reference of the status. Unique within this response but not guaranteed to be stable across requests. */
  statusReference?: string;
}
