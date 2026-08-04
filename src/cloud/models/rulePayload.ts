import { z } from 'zod';
import { apiObject } from '#/core';
/** The payload for creating rules in a workflow */

export const RulePayloadSchema = apiObject({
  /** The parameters of the rule */
  parameters: z.record(z.string(), z.any()).optional(),
  /**
   * The key of the rule. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-capabilities-get
   */
  ruleKey: z.string().optional(),
});

export type RulePayload = z.infer<typeof RulePayloadSchema>;
