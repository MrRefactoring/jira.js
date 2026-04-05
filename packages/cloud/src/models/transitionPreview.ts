import { z } from 'zod';
import { PreviewRuleConfigurationSchema } from '#/models/previewRuleConfiguration';
import { PreviewConditionGroupConfigurationSchema } from '#/models/previewConditionGroupConfiguration';
import { TransitionLinkSchema } from '#/models/transitionLink';
import { PreviewTriggerSchema } from '#/models/previewTrigger';

/** Details about a workflow transition in preview context. */
export const TransitionPreviewSchema = z.object({
  /** The post-functions of the transition. */
  actions: z.array(PreviewRuleConfigurationSchema).optional(),
  conditions: PreviewConditionGroupConfigurationSchema.optional(),
  /** The custom issue event ID for the transition. */
  customIssueEventId: z.string().optional(),
  /** The description of the transition. */
  description: z.string().optional(),
  /** The ID of the transition. */
  id: z.string().optional(),
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links: z.array(TransitionLinkSchema).optional(),
  /** The name of the transition. */
  name: z.string().optional(),
  /** The status the transition goes to. */
  toStatusReference: z.string().optional(),
  transitionScreen: PreviewRuleConfigurationSchema.optional(),
  /** The triggers of the transition. */
  triggers: z.array(PreviewTriggerSchema).optional(),
  /** The transition type. */
  type: z.enum(['INITIAL', 'GLOBAL', 'DIRECTED']).optional(),
  /** The validators of the transition. */
  validators: z.array(PreviewRuleConfigurationSchema).optional(),
});

export type TransitionPreview = z.infer<typeof TransitionPreviewSchema>;
