import { z } from 'zod';

/**
 * The description of the page of issues loaded by the provided JQL query.This bean will be replacing
 * IssuesJqlMetaDataBean bean as part of new `evaluate` endpoint
 */
export const JExpEvaluateIssuesJqlMetaDataBeanSchema = z.object({
  /** Indicates whether this is the last page of the paginated response. */
  isLast: z.boolean().optional(),
  /** Next Page token for the next page of issues. */
  nextPageToken: z.string(),
});

export type JExpEvaluateIssuesJqlMetaDataBean = z.infer<typeof JExpEvaluateIssuesJqlMetaDataBeanSchema>;
