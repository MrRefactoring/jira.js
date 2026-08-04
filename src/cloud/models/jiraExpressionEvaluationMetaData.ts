import type { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionsComplexitySchema } from './jiraExpressionsComplexity';
import { IssuesMetaSchema } from './issuesMeta';

export const JiraExpressionEvaluationMetaDataSchema = apiObject({
  complexity: JiraExpressionsComplexitySchema.optional(),
  issues: IssuesMetaSchema.optional(),
});

export type JiraExpressionEvaluationMetaData = z.infer<typeof JiraExpressionEvaluationMetaDataSchema>;
