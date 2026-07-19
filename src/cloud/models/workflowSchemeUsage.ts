import { z } from 'zod';
import { apiObject } from '#/core';
/** The worflow scheme. */

export const WorkflowSchemeUsageSchema = apiObject({
  /** The workflow scheme ID. */
  id: z.string().optional(),
});

export type WorkflowSchemeUsage = z.infer<typeof WorkflowSchemeUsageSchema>;
