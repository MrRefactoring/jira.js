import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID and the name of the workflow scheme. */

export const WorkflowSchemeIdNameSchema = apiObject({
  /** The ID of the workflow scheme. */
  id: z.string(),
  /** The name of the workflow scheme. */
  name: z.string(),
});

export type WorkflowSchemeIdName = z.infer<typeof WorkflowSchemeIdNameSchema>;
