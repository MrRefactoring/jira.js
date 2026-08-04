import { z } from 'zod';
import { apiObject } from '#/core';
/** Project ID details. */

export const WorkflowProjectIdScopeSchema = apiObject({
  /** The ID of the project. */
  id: z.string().optional(),
});

export type WorkflowProjectIdScope = z.infer<typeof WorkflowProjectIdScopeSchema>;
