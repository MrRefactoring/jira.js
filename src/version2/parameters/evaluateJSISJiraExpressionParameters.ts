import { z } from 'zod';

export const EvaluateJSISJiraExpressionParametersSchema = z.object({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts `meta.complexity` that returns information about the expression
   * complexity. For example, the number of expensive operations used by the expression and how close the expression is
   * to reaching the [complexity
   * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing
   * and debugging your expressions.
   */
  expand: z.string().optional(),
  /** The context in which the Jira expression is evaluated. */
  context: z.unknown().optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type EvaluateJSISJiraExpressionParameters = z.infer<typeof EvaluateJSISJiraExpressionParametersSchema>;
