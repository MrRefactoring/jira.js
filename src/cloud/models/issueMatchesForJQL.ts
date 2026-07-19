import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of the issues matched to a JQL query or details of errors encountered during matching. */

export const IssueMatchesForJQLSchema = apiObject({
  /** A list of errors. */
  errors: z.array(z.string()),
  /** A list of issue IDs. */
  matchedIssues: z.array(z.number()),
});

export type IssueMatchesForJQL = z.infer<typeof IssueMatchesForJQLSchema>;
