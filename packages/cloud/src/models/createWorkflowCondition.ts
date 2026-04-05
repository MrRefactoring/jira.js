import { z } from 'zod';

export type CreateWorkflowCondition = {
  conditions?: CreateWorkflowCondition[];
  configuration?: Record<string, unknown>;
  operator?: 'AND' | 'OR';
  type?: string;
};

/** A workflow transition condition. */
export const CreateWorkflowConditionSchema: z.ZodType<CreateWorkflowCondition> = z.object({
  /** The list of workflow conditions. */
  conditions: z.array(z.lazy(() => CreateWorkflowConditionSchema)).optional(),
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.record(z.string(), z.unknown()).optional(),
  /** The compound condition operator. */
  operator: z.enum(['AND', 'OR']).optional(),
  /** The type of the transition rule. */
  type: z.string().optional(),
});
