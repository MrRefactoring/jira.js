import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkflowSchemeRequestSchema = apiObject({
  defaultWorkflow: z.boolean().optional(),
  issueTypes: z.array(z.string()).optional(),
  workflow: z.string().optional(),
});

export type WorkflowSchemeRequest = z.infer<typeof WorkflowSchemeRequestSchema>;
