import type { DocumentVersion } from './documentVersion';
import type { ProjectIssueTypes } from './projectIssueTypes';
import type { WorkflowLayout } from './workflowLayout';
import type { WorkflowReferenceStatus } from './workflowReferenceStatus';
import type { WorkflowScope } from './workflowScope';
import type { WorkflowTransitions } from './workflowTransitions';

/** Details of a workflow. */
export interface JiraWorkflow {
  /** The description of the workflow. */
  description?: string;
  /** The ID of the workflow. */
  id?: string;
  /** Indicates if the workflow can be edited. */
  isEditable?: boolean;
  /** The name of the workflow. */
  name?: string;
  scope?: WorkflowScope;
  startPointLayout?: WorkflowLayout;
  /** The statuses referenced in this workflow. */
  statuses?: WorkflowReferenceStatus[];
  /** If there is a current [asynchronous task](#async-operations) operation for this workflow. */
  taskId?: string;
  /** The transitions of the workflow. */
  transitions?: WorkflowTransitions[];
  /**
   * Use the optional `workflows.usages` expand to get additional information about the projects and issue types
   * associated with the requested workflows.
   */
  usages?: ProjectIssueTypes[];
  version?: DocumentVersion;
}
