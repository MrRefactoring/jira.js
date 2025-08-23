import { z } from 'zod';
import { JExpEvaluateIssuesJqlMetaDataBeanSchema } from './jExpEvaluateIssuesJqlMetaDataBean';

/**
 * Meta data describing the `issues` context variable.This bean will be replacing IssuesMetaBean bean as part of new
 * `evaluate` endpoint
 */
export const JExpEvaluateIssuesMetaBeanSchema = z.object({
  jql: JExpEvaluateIssuesJqlMetaDataBeanSchema.optional(),
});

export type JExpEvaluateIssuesMetaBean = z.infer<typeof JExpEvaluateIssuesMetaBeanSchema>;
