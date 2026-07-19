import { z } from 'zod';
import { apiObject } from '#/core';
/** A workflow transition rule condition. This object returns `nodeType` as `simple`. */

export const WorkflowSimpleConditionSchema = apiObject({
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.record(z.string(), z.any()).optional(),
  nodeType: z.string(),
  /** The type of the transition rule. */
  type: z.string(),
});

export type WorkflowSimpleCondition = z.infer<typeof WorkflowSimpleConditionSchema>;
