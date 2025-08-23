import { z } from 'zod';

/** A workflow scheme along with a list of projects that use it. */
export const WorkflowSchemeAssociationsSchema = z.object({
  /** The list of projects that use the workflow scheme. */
  projectIds: z.array(z.string()),
  /** The workflow scheme. */
  workflowScheme: z.unknown(),
});

export type WorkflowSchemeAssociations = z.infer<typeof WorkflowSchemeAssociationsSchema>;
