import { z } from 'zod';
import { WorkflowSchemeSchema } from '#/models/workflowScheme';

/** A workflow scheme along with a list of projects that use it. */
export const WorkflowSchemeAssociationsSchema = z.object({
  /** The list of projects that use the workflow scheme. */
  projectIds: z.array(z.string()),
  workflowScheme: WorkflowSchemeSchema.optional(),
});

export type WorkflowSchemeAssociations = z.infer<typeof WorkflowSchemeAssociationsSchema>;
