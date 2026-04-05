import { z } from 'zod';

/** Rule configuration for workflow transitions. */
export const PreviewRuleConfigurationSchema = z.object({
  /** A transient identifier for this element, unique within this response but not guaranteed to stable across requests. */
  id: z.string().optional(),
  /** The parameters of the rule. */
  parameters: z.record(z.string(), z.any()).optional(),
  /** The rule key of the rule. */
  ruleKey: z.string().optional(),
});

export type PreviewRuleConfiguration = z.infer<typeof PreviewRuleConfigurationSchema>;
