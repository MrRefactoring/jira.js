/** The payload for creating rules in a workflow */
export interface RulePayload {
  /** The parameters of the rule */
  parameters?: {};
  /**
   * The key of the rule. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-capabilities-get
   */
  ruleKey?: string;
}
