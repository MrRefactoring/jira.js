/** The Atlassian provided system rules available. */
export interface AvailableWorkflowSystemRule {
  /** The rule description. */
  description: string;
  /** List of rules that conflict with this one. */
  incompatibleRuleKeys: string[];
  /** Whether the rule can be added to an initial transition. */
  isAvailableForInitialTransition: boolean;
  /** Whether the rule is visible. */
  isVisible: boolean;
  /** The rule name. */
  name: string;
  /** The rule key. */
  ruleKey: string;
  /** The rule type. */
  ruleType: string;
}
