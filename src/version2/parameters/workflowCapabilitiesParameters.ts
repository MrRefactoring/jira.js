import { z } from 'zod';

export const WorkflowCapabilitiesParametersSchema = z.object({
  workflowId: z.string().optional(),
  projectId: z.string().optional(),
  issueTypeId: z.string().optional(),
});

export type WorkflowCapabilitiesParameters = z.infer<typeof WorkflowCapabilitiesParametersSchema>;
