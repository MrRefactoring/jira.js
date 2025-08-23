import { z } from 'zod';

/** A list of the issues matched to a JQL query or details of errors encountered during matching. */
export const IssueMatchesForJQLSchema = z.object({
  /** A list of errors. */
  errors: z.array(z.string()),
  /** A list of issue IDs. */
  matchedIssues: z.array(z.number().int()),
});

export type IssueMatchesForJQL = z.infer<typeof IssueMatchesForJQLSchema>;
