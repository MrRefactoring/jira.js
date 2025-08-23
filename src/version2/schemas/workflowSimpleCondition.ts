import { z } from 'zod';

/** A workflow transition rule condition. This object returns `nodeType` as `simple`. */
export const WorkflowSimpleConditionSchema = z.object({
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.object({}).optional(),
  nodeType: z.string(),
  /** The type of the transition rule. */
  type: z.string(),
});

export type WorkflowSimpleCondition = z.infer<typeof WorkflowSimpleConditionSchema>;
