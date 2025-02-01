import { WorkflowMetadataRestModel } from './workflowMetadataRestModel';
import { WorkflowScope } from './workflowScope';
import { DocumentVersion } from './documentVersion';
import { WorkflowMetadataAndIssueTypeRestModel } from './workflowMetadataAndIssueTypeRestModel';

export interface WorkflowSchemeReadResponse {
  defaultWorkflow?: WorkflowMetadataRestModel;
  /** The description of the workflow scheme. */
  description?: string;
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
  /** The IDs of projects using the workflow scheme. */
  projectIdsUsingScheme: string[];
  scope: WorkflowScope;
  /** Indicates if there's an [asynchronous task](#async-operations) for this workflow scheme. */
  taskId?: string;
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: WorkflowMetadataAndIssueTypeRestModel[];
}
