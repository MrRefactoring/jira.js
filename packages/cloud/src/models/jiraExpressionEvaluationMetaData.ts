import { z } from 'zod';
import { JiraExpressionsComplexitySchema } from '#/models/jiraExpressionsComplexity';
import { IssuesMetaSchema } from '#/models/issuesMeta';

export const JiraExpressionEvaluationMetaDataSchema = z.object({
  complexity: JiraExpressionsComplexitySchema.optional(),
  issues: IssuesMetaSchema.optional(),
});

export type JiraExpressionEvaluationMetaData = z.infer<typeof JiraExpressionEvaluationMetaDataSchema>;
