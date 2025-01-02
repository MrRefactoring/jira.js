import { IssueMatchesForJQL } from './issueMatchesForJQL.mjs';

/** A list of matched issues or errors for each Jql query, in the order the Jql queries were passed. */
export interface IssueMatches {
  matches: IssueMatchesForJQL[];
}
