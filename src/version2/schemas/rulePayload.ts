import { z } from 'zod';

/** The payload for creating rules in a workflow */
export const RulePayloadSchema = z.object({
  /** The parameters of the rule */
  parameters: z.object({}).optional(),
  /**
   * The key of the rule. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-capabilities-get
   */
  ruleKey: z.string().optional(),
});

export type RulePayload = z.infer<typeof RulePayloadSchema>;
