import { z } from 'zod';

export const WorkflowCapabilitiesSchema = z.object({
  workflowId: z.string().optional(),
  projectId: z.string().optional(),
  issueTypeId: z.string().optional(),
});

export type WorkflowCapabilities = z.input<typeof WorkflowCapabilitiesSchema>;
