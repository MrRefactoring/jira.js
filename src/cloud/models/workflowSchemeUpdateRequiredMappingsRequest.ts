import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowSchemeAssociationSchema } from './workflowSchemeAssociation';
/** The request payload to get the required mappings for updating a workflow scheme. */

export const WorkflowSchemeUpdateRequiredMappingsRequestSchema = apiObject({
  /**
   * The ID of the new default workflow for this workflow scheme. Only used in global-scoped workflow schemes. If it
   * isn't specified, is set to _Jira Workflow (jira)_.
   */
  defaultWorkflowId: z.string().nullish(),
  /** The ID of the workflow scheme. */
  id: z.string(),
  /** The new workflow to issue type mappings for this workflow scheme. */
  workflowsForIssueTypes: z.array(WorkflowSchemeAssociationSchema),
});

export type WorkflowSchemeUpdateRequiredMappingsRequest = z.infer<
  typeof WorkflowSchemeUpdateRequiredMappingsRequestSchema
>;
