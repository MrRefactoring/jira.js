import { z } from 'zod';

/** An associated workflow scheme and project. */
export const WorkflowSchemeProjectAssociationSchema = z.object({
  /** The ID of the project. */
  projectId: z.string(),
  /**
   * The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow
   * scheme.
   */
  workflowSchemeId: z.string().optional(),
});

export type WorkflowSchemeProjectAssociation = z.infer<typeof WorkflowSchemeProjectAssociationSchema>;
