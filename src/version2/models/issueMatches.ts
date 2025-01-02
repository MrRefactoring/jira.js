import type { IssueMatchesForJQL } from './issueMatchesForJQL.js';

/** A list of matched issues or errors for each JQL query, in the order the JQL queries were passed. */
export interface IssueMatches {
  matches: IssueMatchesForJQL[];
}
