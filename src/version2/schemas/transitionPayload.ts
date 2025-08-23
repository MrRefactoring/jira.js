import { z } from 'zod';
import { RulePayloadSchema } from './rulePayload';
import { ConditionGroupPayloadSchema } from './conditionGroupPayload';
import { FromLayoutPayloadSchema } from './fromLayoutPayload';
import { ToLayoutPayloadSchema } from './toLayoutPayload';

/** The payload for creating a transition in a workflow. Can be DIRECTED, GLOBAL, SELF-LOOPED, GLOBAL LOOPED */
export const TransitionPayloadSchema = z.object({
  /** The actions that are performed when the transition is made */
  actions: z.array(RulePayloadSchema).optional(),
  conditions: ConditionGroupPayloadSchema.optional(),
  /**
   * Mechanism in Jira for triggering certain actions, like notifications, automations, etc. Unless a custom
   * notification scheme is configure, it's better not to provide any value here
   */
  customIssueEventId: z.string().optional(),
  /** The description of the transition */
  description: z.string().optional(),
  /** The statuses that the transition can be made from */
  from: z.array(FromLayoutPayloadSchema).optional(),
  /** The id of the transition */
  id: z.number().int().optional(),
  /** The name of the transition */
  name: z.string().optional(),
  /** The properties of the transition */
  properties: z.object({}).optional(),
  to: ToLayoutPayloadSchema.optional(),
  transitionScreen: RulePayloadSchema.optional(),
  /** The triggers that are performed when the transition is made */
  triggers: z.array(RulePayloadSchema).optional(),
  /** The type of the transition */
  type: z.enum(['global', 'initial', 'directed']).optional(),
  /** The validators that are performed when the transition is made */
  validators: z.array(RulePayloadSchema).optional(),
});

export type TransitionPayload = z.infer<typeof TransitionPayloadSchema>;
