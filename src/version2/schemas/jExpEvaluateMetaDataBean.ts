import { z } from 'zod';

/**
 * Contains information about the expression evaluation. This bean will be replacing
 * `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint
 */
export const JExpEvaluateMetaDataBeanSchema = z.object({
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

export type JExpEvaluateMetaDataBean = z.infer<typeof JExpEvaluateMetaDataBeanSchema>;
