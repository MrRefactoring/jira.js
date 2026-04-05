import { z } from 'zod';
import { CreateWorkflowTransitionRulesDetailsSchema } from '#/models/createWorkflowTransitionRulesDetails';
import { CreateWorkflowTransitionScreenDetailsSchema } from '#/models/createWorkflowTransitionScreenDetails';

/** The details of a workflow transition. */
export const CreateWorkflowTransitionDetailsSchema = z.object({
  /** The description of the transition. The maximum length is 1000 characters. */
  description: z.string().optional(),
  /** The statuses the transition can start from. */
  from: z.array(z.string()).optional(),
  /** The name of the transition. The maximum length is 60 characters. */
  name: z.string(),
  /** The properties of the transition. */
  properties: z.record(z.string(), z.any()).optional(),
  rules: CreateWorkflowTransitionRulesDetailsSchema.optional(),
  screen: CreateWorkflowTransitionScreenDetailsSchema.optional(),
  /** The status the transition goes to. */
  to: z.string(),
  /** The type of the transition. */
  type: z.enum(['global', 'initial', 'directed']),
});

export type CreateWorkflowTransitionDetails = z.infer<typeof CreateWorkflowTransitionDetailsSchema>;
