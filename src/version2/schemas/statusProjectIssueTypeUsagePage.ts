import { z } from 'zod';
import { StatusProjectIssueTypeUsageSchema } from './statusProjectIssueTypeUsage';

/** A page of issue types. */
export const StatusProjectIssueTypeUsagePageSchema = z.object({
  /** Page token for the next page of issue type usages. */
  nextPageToken: z.string().optional(),
  /** The list of issue types. */
  values: z.array(StatusProjectIssueTypeUsageSchema).optional(),
});

export type StatusProjectIssueTypeUsagePage = z.infer<typeof StatusProjectIssueTypeUsagePageSchema>;
