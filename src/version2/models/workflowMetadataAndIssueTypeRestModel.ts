import type { WorkflowMetadataRestModel } from './workflowMetadataRestModel';

/** The workflow metadata and issue type IDs which use this workflow. */
export interface WorkflowMetadataAndIssueTypeRestModel {
  /** The list of issue type IDs for the mapping. */
  issueTypeIds: string[];
  workflow: WorkflowMetadataRestModel;
}
