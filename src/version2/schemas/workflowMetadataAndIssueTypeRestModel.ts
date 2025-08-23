import { z } from 'zod';
import { WorkflowMetadataRestModelSchema } from './workflowMetadataRestModel';

/** The workflow metadata and issue type IDs which use this workflow. */
export const WorkflowMetadataAndIssueTypeRestModelSchema = z.object({
  /** The list of issue type IDs for the mapping. */
  issueTypeIds: z.array(z.string()),
  workflow: WorkflowMetadataRestModelSchema,
});

export type WorkflowMetadataAndIssueTypeRestModel = z.infer<typeof WorkflowMetadataAndIssueTypeRestModelSchema>;
