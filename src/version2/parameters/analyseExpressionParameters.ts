import { z } from 'zod';

export const AnalyseExpressionParametersSchema = z.object({
  /**
   * The check to perform:
   *
   * - `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are
   *   validated. For example, the expression's length.
   * - `type` EXPERIMENTAL. Each expression is type checked and the final type of the expression inferred. Any type errors
   *   that would result in the expression failure at runtime are reported. For example, accessing properties that don't
   *   exist or passing the wrong number of arguments to functions. Also performs the syntax check.
   * - `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive
   *   operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each
   *   expression may execute.
   */
  check: z.enum(['syntax', 'type', 'complexity']).optional(),
  /**
   * Context variables and their types. The type checker assumes that [common context
   * variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables), such as
   * `issue` or `project`, are available in context and sets their type. Use this property to override the default types
   * or provide details of new variables.
   */
  contextVariables: z.object({}).optional(),
  /** The list of Jira expressions to analyse. */
  expressions: z.array(z.string()),
});

export type AnalyseExpressionParameters = z.infer<typeof AnalyseExpressionParametersSchema>;
