import { z } from 'zod';
import { apiObject } from '#/core';
/** The explicit association between issue types and a workflow in a workflow scheme. */

export const WorkflowSchemeAssociationSchema = apiObject({
  /** The issue types assigned to the workflow. */
  issueTypeIds: z.array(z.string()),
  /** The ID of the workflow. */
  workflowId: z.string(),
});

export type WorkflowSchemeAssociation = z.infer<typeof WorkflowSchemeAssociationSchema>;
