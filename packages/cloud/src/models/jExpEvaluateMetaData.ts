import { z } from 'zod';
import { JiraExpressionsComplexitySchema } from '#/models/jiraExpressionsComplexity';
import { JExpEvaluateIssuesMetaSchema } from '#/models/jExpEvaluateIssuesMeta';

/**
 * Contains information about the expression evaluation. This bean will be replacing
 * `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint
 */
export const JExpEvaluateMetaDataSchema = z.object({
  complexity: JiraExpressionsComplexitySchema.optional(),
  issues: JExpEvaluateIssuesMetaSchema.optional(),
});

export type JExpEvaluateMetaData = z.infer<typeof JExpEvaluateMetaDataSchema>;
