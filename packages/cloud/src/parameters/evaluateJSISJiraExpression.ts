import { z } from 'zod';
import { JiraExpressionEvaluateRequestSchema } from '../models';

export const EvaluateJSISJiraExpressionSchema = z
  .object({
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information in the response. This parameter accepts `meta.complexity` that returns information about the
     * expression complexity. For example, the number of expensive operations used by the expression and how close the
     * expression is to reaching the [complexity
     * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing
     * and debugging your expressions.
     */
    expand: z
      .union([z.string(), z.array(z.string()), z.enum(['meta.complexity']), z.array(z.enum(['meta.complexity']))])
      .optional(),
  })
  .extend(JiraExpressionEvaluateRequestSchema.shape);

export type EvaluateJSISJiraExpression = z.input<typeof EvaluateJSISJiraExpressionSchema>;
