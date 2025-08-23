import { z } from 'zod';
import { IssueMatchesForJQLSchema } from './issueMatchesForJQL';

/** A list of matched issues or errors for each JQL query, in the order the JQL queries were passed. */
export const IssueMatchesSchema = z.object({
  matches: z.array(IssueMatchesForJQLSchema),
});

export type IssueMatches = z.infer<typeof IssueMatchesSchema>;
