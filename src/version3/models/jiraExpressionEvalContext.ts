import { CustomContextVariable } from './customContextVariable';
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
  /**
   * Custom context variables and their types. These variable types are available for use in a custom context:
   *
   * `user`: A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)
   * specified as an Atlassian account ID. `issue`: An
   * [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID
   * or key. All the fields of the issue object are available in the Jira expression. `json`: A JSON object containing
   * custom content. `list`: A JSON list of `user`, `issue`, or `json` variable types.
   */
  custom?: CustomContextVariable[];
}
