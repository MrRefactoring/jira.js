import { z } from 'zod';

export const ReadWorkflowSchemesParametersSchema = z.object({
  /** The list of project IDs to query. */
  projectIds: z.array(z.string()).optional(),
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds: z.array(z.string()).optional(),
});

export type ReadWorkflowSchemesParameters = z.infer<typeof ReadWorkflowSchemesParametersSchema>;
