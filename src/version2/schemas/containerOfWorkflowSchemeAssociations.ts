import { z } from 'zod';
import { WorkflowSchemeAssociationsSchema } from './workflowSchemeAssociations';

/** A container for a list of workflow schemes together with the projects they are associated with. */
export const ContainerOfWorkflowSchemeAssociationsSchema = z.object({
  /** A list of workflow schemes together with projects they are associated with. */
  values: z.array(WorkflowSchemeAssociationsSchema),
});

export type ContainerOfWorkflowSchemeAssociations = z.infer<typeof ContainerOfWorkflowSchemeAssociationsSchema>;
