import { WorkflowScope } from './workflowScope';
import { WorkflowLayout } from './workflowLayout';
import { WorkflowReferenceStatus } from './workflowReferenceStatus';
import { WorkflowTransitions } from './workflowTransitions';
import { ProjectIssueTypes } from './projectIssueTypes';
import { DocumentVersion } from './documentVersion';

/** Details of a workflow. */
export interface JiraWorkflow {
  /** The creation date of the workflow. */
  created?: string;
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
  /**
   * The transitions of the workflow. Note that a transition can have either the deprecated `to`/`from` fields or the
   * `toStatusReference`/`links` fields, but never both nor a combination.
   */
  transitions?: WorkflowTransitions[];
  /** The last edited date of the workflow. */
  updated?: string;
  /**
   * Use the optional `workflows.usages` expand to get additional information about the projects and issue types
   * associated with the requested workflows.
   */
  usages?: ProjectIssueTypes[];
  version?: DocumentVersion;
}
