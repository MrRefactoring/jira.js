import { z } from 'zod';
import { CreateWorkflowConditionSchema } from './createWorkflowCondition';

/** A workflow transition condition. */
export const CreateWorkflowConditionSchema = z.object({
  /** The list of workflow conditions. */
  conditions: z.array(CreateWorkflowConditionSchema).optional(),
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.object({}).optional(),
  /** The compound condition operator. */
  operator: z.enum(['AND', 'OR']).optional(),
  /** The type of the transition rule. */
  type: z.string().optional(),
});

export type CreateWorkflowCondition = z.infer<typeof CreateWorkflowConditionSchema>;
