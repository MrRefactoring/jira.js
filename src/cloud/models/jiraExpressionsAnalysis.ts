import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionAnalysisSchema } from './jiraExpressionAnalysis';
/** Details about the analysed Jira expression. */

export const JiraExpressionsAnalysisSchema = apiObject({
  /** The results of Jira expressions analysis. */
  results: z.array(JiraExpressionAnalysisSchema),
});

export type JiraExpressionsAnalysis = z.infer<typeof JiraExpressionsAnalysisSchema>;
