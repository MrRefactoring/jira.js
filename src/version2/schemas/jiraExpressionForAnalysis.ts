import { z } from 'zod';

/** Details of Jira expressions for analysis. */
export const JiraExpressionForAnalysisSchema = z.object({
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

export type JiraExpressionForAnalysis = z.infer<typeof JiraExpressionForAnalysisSchema>;
