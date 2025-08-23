import { z } from 'zod';
import { WorkflowMetadataRestModelSchema } from './workflowMetadataRestModel';
import { WorkflowScopeSchema } from './workflowScope';
import { DocumentVersionSchema } from './documentVersion';
import { WorkflowMetadataAndIssueTypeRestModelSchema } from './workflowMetadataAndIssueTypeRestModel';

export const WorkflowSchemeReadResponseSchema = z.object({
  defaultWorkflow: WorkflowMetadataRestModelSchema.optional(),
  /** The description of the workflow scheme. */
  description: z.string().optional(),
  /** The ID of the workflow scheme. */
  id: z.string(),
  /** The name of the workflow scheme. */
  name: z.string(),
  scope: WorkflowScopeSchema,
  /** Indicates if there's an [asynchronous task](#async-operations) for this workflow scheme. */
  taskId: z.string().optional(),
  version: DocumentVersionSchema,
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: z.array(WorkflowMetadataAndIssueTypeRestModelSchema),
});

export type WorkflowSchemeReadResponse = z.infer<typeof WorkflowSchemeReadResponseSchema>;
