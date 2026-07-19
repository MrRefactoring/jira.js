import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of issue types. */

export const StatusProjectIssueTypeUsageSchema = apiObject({
  /** The issue type ID. */
  id: z.string().optional(),
});

export type StatusProjectIssueTypeUsage = z.infer<typeof StatusProjectIssueTypeUsageSchema>;
