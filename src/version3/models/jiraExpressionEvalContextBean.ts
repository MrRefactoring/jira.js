import { IdOrKeyBean, IdOrKeyBean } from './idOrKeyBean';
import { JexpIssues } from './jexpIssues';

export interface JiraExpressionEvalContextBean {
  /** The issue that is available under the `issue` variable when evaluating the expression. */
  issue?: IdOrKeyBean[];
  /** The collection of issues that is available under the `issues` variable when evaluating the expression. */
  issues?: JexpIssues[];
  /** The project that is available under the `project` variable when evaluating the expression. */
  project?: IdOrKeyBean[];
  /** The ID of the sprint that is available under the `sprint` variable when evaluating the expression. */
  sprint?: number;
  /** The ID of the board that is available under the `board` variable when evaluating the expression. */
  board?: number;
  /** The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression. */
  serviceDesk?: number;
  /** The ID of the customer request that is available under the `customerRequest` variable when evaluating the expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will have a different type. */
  customerRequest?: number;
}
