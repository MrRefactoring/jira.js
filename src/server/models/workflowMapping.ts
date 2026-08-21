import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkflowMappingSchema = apiObject({
  defaultMapping: z.boolean().optional(),
  issueTypes: z.array(z.string()).optional(),
  updateDraftIfNeeded: z.boolean().optional(),
  workflow: z.string().optional(),
});

export type WorkflowMapping = z.infer<typeof WorkflowMappingSchema>;
