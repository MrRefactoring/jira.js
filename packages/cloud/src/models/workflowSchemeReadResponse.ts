import { z } from 'zod';
import { WorkflowMetadataRestModelSchema } from '#/models/workflowMetadataRestModel';
import { WorkflowScopeSchema } from '#/models/workflowScope';
import { DocumentVersionSchema } from '#/models/documentVersion';
import { WorkflowMetadataAndIssueTypeRestModelSchema } from '#/models/workflowMetadataAndIssueTypeRestModel';

export const WorkflowSchemeReadResponseSchema = z.object({
  defaultWorkflow: WorkflowMetadataRestModelSchema.optional(),
  /** The description of the workflow scheme. */
  description: z.string().nullable().optional(),
  /** The ID of the workflow scheme. */
  id: z.string(),
  /** The name of the workflow scheme. */
  name: z.string(),
  scope: WorkflowScopeSchema,
  /**
   * Indicates if there's an [asynchronous
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async-operations) for this workflow
   * scheme.
   */
  taskId: z.string().nullable().optional(),
  version: DocumentVersionSchema,
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: z.array(WorkflowMetadataAndIssueTypeRestModelSchema),
});

export type WorkflowSchemeReadResponse = z.infer<typeof WorkflowSchemeReadResponseSchema>;
