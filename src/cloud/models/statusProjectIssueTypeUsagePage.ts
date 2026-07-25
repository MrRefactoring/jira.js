import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusProjectIssueTypeUsageSchema } from './statusProjectIssueTypeUsage';
/** A page of issue types. */

export const StatusProjectIssueTypeUsagePageSchema = apiObject({
  /** Page token for the next page of issue type usages. */
  nextPageToken: z.string().nullish(),
  /** The list of issue types. */
  values: z.array(StatusProjectIssueTypeUsageSchema).optional(),
});

export type StatusProjectIssueTypeUsagePage = z.infer<typeof StatusProjectIssueTypeUsagePageSchema>;
