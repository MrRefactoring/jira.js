/** A rule configuration. */
export interface RuleConfiguration {
  /** Configuration of the rule, as it is stored by the Connect app on the rule configuration page. */
  value: string;
  /** EXPERIMENTAL: Whether the rule is disabled. */
  disabled?: boolean;
  /**
   * EXPERIMENTAL: A tag used to filter rules in [Get workflow transition rule
   * configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
   */
  tag?: string;
}
