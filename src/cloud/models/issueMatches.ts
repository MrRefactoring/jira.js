import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueMatchesForJQLSchema } from './issueMatchesForJQL';
/** A list of matched issues or errors for each JQL query, in the order the JQL queries were passed. */

export const IssueMatchesSchema = apiObject({
  matches: z.array(IssueMatchesForJQLSchema),
});

export type IssueMatches = z.infer<typeof IssueMatchesSchema>;
