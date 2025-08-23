import { z } from 'zod';
import { WorkflowConditionSchema } from './workflowCondition';

/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */
export const WorkflowCompoundConditionSchema = z.object({
  /** The list of workflow conditions. */
  conditions: z.array(WorkflowConditionSchema),
  nodeType: z.string(),
  /** The compound condition operator. */
  operator: z.enum(['AND', 'OR']),
});

export type WorkflowCompoundCondition = z.infer<typeof WorkflowCompoundConditionSchema>;
