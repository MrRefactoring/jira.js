import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * The description of the page of issues loaded by the provided JQL query.This bean will be replacing
 * IssuesJqlMetaDataBean bean as part of new `evaluate` endpoint
 */

export const JExpEvaluateIssuesJqlMetaDataSchema = apiObject({
  /** Indicates whether this is the last page of the paginated response. */
  isLast: z.boolean().optional(),
  /** Next Page token for the next page of issues. */
  nextPageToken: z.string().nullable(),
});

export type JExpEvaluateIssuesJqlMetaData = z.infer<typeof JExpEvaluateIssuesJqlMetaDataSchema>;
