import type { WorkflowMetadataRestModel } from './workflowMetadataRestModel';
import type { WorkflowScope } from './workflowScope';
import type { DocumentVersion } from './documentVersion';
import type { WorkflowMetadataAndIssueTypeRestModel } from './workflowMetadataAndIssueTypeRestModel';

export interface WorkflowSchemeReadResponse {
  defaultWorkflow?: WorkflowMetadataRestModel;
  /** The description of the workflow scheme. */
  description?: string;
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
  scope: WorkflowScope;
  /** Indicates if there's an [asynchronous task](#async-operations) for this workflow scheme. */
  taskId?: string;
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: WorkflowMetadataAndIssueTypeRestModel[];
}
