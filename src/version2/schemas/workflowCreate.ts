import { z } from 'zod';
import { WorkflowLayoutSchema } from './workflowLayout';
import { StatusLayoutUpdateSchema } from './statusLayoutUpdate';
import { TransitionUpdateDTOSchema } from './transitionUpdateDTO';

/** The details of the workflows to create. */
export const WorkflowCreateSchema = z.object({
  /** The description of the workflow to create. */
  description: z.string().optional(),
  loopedTransitionContainerLayout: WorkflowLayoutSchema.optional(),
  /** The name of the workflow to create. */
  name: z.string(),
  startPointLayout: WorkflowLayoutSchema.optional(),
  /** The statuses associated with this workflow. */
  statuses: z.array(StatusLayoutUpdateSchema),
  /** The transitions of this workflow. */
  transitions: z.array(TransitionUpdateDTOSchema),
});

export type WorkflowCreate = z.infer<typeof WorkflowCreateSchema>;
