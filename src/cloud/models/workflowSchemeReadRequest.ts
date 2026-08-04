import { z } from 'zod';
import { apiObject } from '#/core';
/** The workflow scheme read request body. */

export const WorkflowSchemeReadRequestSchema = apiObject({
  /** The list of project IDs to query. */
  projectIds: z.array(z.string().nullable()).nullish(),
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds: z.array(z.string().nullable()).nullish(),
});

export type WorkflowSchemeReadRequest = z.infer<typeof WorkflowSchemeReadRequestSchema>;
