import { z } from 'zod';

export const GetAllWorkflowsSchema = z.object({
  /** An optional String containing workflow name. If not passed then all workflows are returned */
  workflowName: z.string().optional(),
});

export type GetAllWorkflows = z.input<typeof GetAllWorkflowsSchema>;
