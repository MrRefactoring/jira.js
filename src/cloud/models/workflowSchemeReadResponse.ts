import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowMetadataRestModelSchema } from './workflowMetadataRestModel';
import { DocumentSchema } from './document';
import { WorkflowScopeSchema } from './workflowScope';
import { DocumentVersionSchema } from './documentVersion';
import { WorkflowMetadataAndIssueTypeRestModelSchema } from './workflowMetadataAndIssueTypeRestModel';

export const WorkflowSchemeReadResponseSchema = apiObject({
  defaultWorkflow: WorkflowMetadataRestModelSchema.optional(),
  /** The description of the workflow scheme. */
  description: DocumentSchema.optional(),
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
  taskId: z.string().nullish(),
  version: DocumentVersionSchema,
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: z.array(WorkflowMetadataAndIssueTypeRestModelSchema),
});

export type WorkflowSchemeReadResponse = z.infer<typeof WorkflowSchemeReadResponseSchema>;
