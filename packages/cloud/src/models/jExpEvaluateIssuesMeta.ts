import { z } from 'zod';
import { JExpEvaluateIssuesJqlMetaDataSchema } from '#/models/jExpEvaluateIssuesJqlMetaData';

/**
 * Meta data describing the `issues` context variable.This bean will be replacing IssuesMetaBean bean as part of new
 * `evaluate` endpoint
 */
export const JExpEvaluateIssuesMetaSchema = z.object({
  jql: JExpEvaluateIssuesJqlMetaDataSchema.optional(),
});

export type JExpEvaluateIssuesMeta = z.infer<typeof JExpEvaluateIssuesMetaSchema>;
