import { JiraExpressionEvalContextBean } from './jiraExpressionEvalContextBean';

export interface JiraExpressionEvalRequestBean {
  /** The Jira expression to evaluate. */
  expression: string;
  context?: JiraExpressionEvalContextBean;
}
