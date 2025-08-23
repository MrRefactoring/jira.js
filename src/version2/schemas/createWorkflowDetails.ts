import { z } from 'zod';
import { CreateWorkflowStatusDetailsSchema } from './createWorkflowStatusDetails';
import { CreateWorkflowTransitionDetailsSchema } from './createWorkflowTransitionDetails';

/** The details of a workflow. */
export const CreateWorkflowDetailsSchema = z.object({
  /** The description of the workflow. The maximum length is 1000 characters. */
  description: z.string().optional(),
  /**
   * The name of the workflow. The name must be unique. The maximum length is 255 characters. Characters can be
   * separated by a whitespace but the name cannot start or end with a whitespace.
   */
  name: z.string(),
  /**
   * The statuses of the workflow. Any status that does not include a transition is added to the workflow without a
   * transition.
   */
  statuses: z.array(CreateWorkflowStatusDetailsSchema),
  /**
   * The transitions of the workflow. For the request to be valid, these transitions must:
   *
   * - Include one _initial_ transition.
   * - Not use the same name for a _global_ and _directed_ transition.
   * - Have a unique name for each _global_ transition.
   * - Have a unique 'to' status for each _global_ transition.
   * - Have unique names for each transition from a status.
   * - Not have a 'from' status on _initial_ and _global_ transitions.
   * - Have a 'from' status on _directed_ transitions.
   *
   * All the transition statuses must be included in `statuses`.
   */
  transitions: z.array(CreateWorkflowTransitionDetailsSchema),
});

export type CreateWorkflowDetails = z.infer<typeof CreateWorkflowDetailsSchema>;
