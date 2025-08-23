import { z } from 'zod';

/** A rule configuration. */
export const RuleConfigurationSchema = z.object({
  /** Whether the rule is disabled. */
  disabled: z.boolean().optional(),
  /**
   * A tag used to filter rules in [Get workflow transition rule
   * configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
   */
  tag: z.string().optional(),
  /** Configuration of the rule, as it is stored by the Connect or the Forge app on the rule configuration page. */
  value: z.string(),
});

export type RuleConfiguration = z.infer<typeof RuleConfigurationSchema>;
