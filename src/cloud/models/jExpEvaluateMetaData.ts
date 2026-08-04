import type { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionsComplexitySchema } from './jiraExpressionsComplexity';
import { JExpEvaluateIssuesMetaSchema } from './jExpEvaluateIssuesMeta';
/**
 * Contains information about the expression evaluation. This bean will be replacing
 * `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint
 */

export const JExpEvaluateMetaDataSchema = apiObject({
  complexity: JiraExpressionsComplexitySchema.optional(),
  issues: JExpEvaluateIssuesMetaSchema.optional(),
});

export type JExpEvaluateMetaData = z.infer<typeof JExpEvaluateMetaDataSchema>;
