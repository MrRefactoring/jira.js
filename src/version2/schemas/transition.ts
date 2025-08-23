import { z } from 'zod';
import { WorkflowRulesSchema } from './workflowRules';
import { TransitionScreenDetailsSchema } from './transitionScreenDetails';

/** Details of a workflow transition. */
export const TransitionSchema = z.object({
  /** The description of the transition. */
  description: z.string(),
  /** The statuses the transition can start from. */
  from: z.array(z.string()),
  /** The ID of the transition. */
  id: z.string(),
  /** The name of the transition. */
  name: z.string(),
  /** The properties of the transition. */
  properties: z.object({}).optional(),
  rules: WorkflowRulesSchema.optional(),
  screen: TransitionScreenDetailsSchema.optional(),
  /** The status the transition goes to. */
  to: z.string(),
  /** The type of the transition. */
  type: z.enum(['global', 'initial', 'directed']),
});

export type Transition = z.infer<typeof TransitionSchema>;
