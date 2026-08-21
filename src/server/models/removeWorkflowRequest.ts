import { z } from 'zod';
import { apiObject } from '#/core';

export const RemoveWorkflowRequestSchema = apiObject({
  nextDefaultWorkflow: z.string().optional(),
  workflow: z.string().optional(),
});

export type RemoveWorkflowRequest = z.infer<typeof RemoveWorkflowRequestSchema>;
