import type { JiraExpressionAnalysis } from './jiraExpressionAnalysis.js';

/** Details about the analysed Jira expression. */
export interface JiraExpressionsAnalysis {
  /** The results of Jira expressions analysis. */
  results: JiraExpressionAnalysis[];
}
