import { z } from 'zod';
import { JiraExpressionAnalysisSchema } from './jiraExpressionAnalysis';

/** Details about the analysed Jira expression. */
export const JiraExpressionsAnalysisSchema = z.object({
  /** The results of Jira expressions analysis. */
  results: z.array(JiraExpressionAnalysisSchema),
});

export type JiraExpressionsAnalysis = z.infer<typeof JiraExpressionsAnalysisSchema>;
