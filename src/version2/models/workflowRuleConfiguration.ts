/** The configuration of the rule. */
export interface WorkflowRuleConfiguration {
  /** The ID of the rule. */
  id?: string;
  /** The parameters related to the rule. */
  parameters?: unknown;
  /** The rule key of the rule. */
  ruleKey: string;
}
