import { z } from 'zod';
import { WorkflowRuleConfigurationSchema } from '#/models/workflowRuleConfiguration';
import { ConditionGroupConfigurationSchema } from '#/models/conditionGroupConfiguration';
import { WorkflowTransitionLinksSchema } from '#/models/workflowTransitionLinks';
import { WorkflowTriggerSchema } from '#/models/workflowTrigger';

/** The transitions of the workflow. */
export const WorkflowTransitionsSchema = z.object({
  /** The post-functions of the transition. */
  actions: z.array(WorkflowRuleConfigurationSchema).optional(),
  conditions: ConditionGroupConfigurationSchema.optional(),
  /** The custom event ID of the transition. */
  customIssueEventId: z.string().nullable().optional(),
  /** The description of the transition. */
  description: z.string().optional(),
  /** The ID of the transition. */
  id: z.string().optional(),
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links: z.array(WorkflowTransitionLinksSchema).optional(),
  /** The name of the transition. */
  name: z.string().optional(),
  /** The properties of the transition. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The status the transition goes to. */
  toStatusReference: z.string().optional(),
  transitionScreen: WorkflowRuleConfigurationSchema.optional(),
  /** The triggers of the transition. */
  triggers: z.array(WorkflowTriggerSchema).optional(),
  /** The transition type. */
  type: z.enum(['INITIAL', 'GLOBAL', 'DIRECTED']).optional(),
  /** The validators of the transition. */
  validators: z.array(WorkflowRuleConfigurationSchema).optional(),
});

export type WorkflowTransitions = z.infer<typeof WorkflowTransitionsSchema>;
