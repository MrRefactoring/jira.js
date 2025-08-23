import { z } from 'zod';

export const JiraExpressionEvaluationMetaDataBeanSchema = z.object({
  /**
   * Contains information about the expression complexity. For example, the number of steps it took to evaluate the
   * expression.
   */
  complexity: z.unknown().optional(),
  /**
   * Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL,
   * information about the page will be included here.
   */
  issues: z.unknown().optional(),
});

export type JiraExpressionEvaluationMetaDataBean = z.infer<typeof JiraExpressionEvaluationMetaDataBeanSchema>;
