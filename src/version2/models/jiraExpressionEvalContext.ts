import { IdOrKey } from './idOrKey';
import { JexpIssues } from './jexpIssues';

/** @deprecated Use JiraExpressionEvalContext instead. */
export type JiraExpressionEvalContextBean = JiraExpressionEvalContext;

export interface JiraExpressionEvalContext {
  issue?: IdOrKey;
  issues?: JexpIssues;
  project?: IdOrKey;
  /** The ID of the sprint that is available under the `sprint` variable when evaluating the expression. */
  sprint?: number;
  /** The ID of the board that is available under the `board` variable when evaluating the expression. */
  board?: number;
  /** The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression. */
  serviceDesk?: number;
  /**
   * The ID of the customer request that is available under the `customerRequest` variable when evaluating the
   * expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will
   * have a different type.
   */
  customerRequest?: number;
  /** Custom context */
  custom?: {};
}
