import { z } from 'zod';
import { apiObject } from '#/core';
/** A workflow transition rule. */

export const WorkflowTransitionRuleSchema = apiObject({
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.unknown().optional(),
  /** The type of the transition rule. */
  type: z.string(),
});

export type WorkflowTransitionRule = z.infer<typeof WorkflowTransitionRuleSchema>;
