/**
 * Details of Jira expressions for analysis. */
export interface JiraExpressionForAnalysis {
  /** The list of Jira expressions to analyse. */
  expressions: string[];
  /** Context variables and their types. The type checker assumes that [common context variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables), such as `issue` or `project`, are available in context and sets their type. Use this property to override the default types or provide details of new variables. */
  contextVariables?: {};
}
