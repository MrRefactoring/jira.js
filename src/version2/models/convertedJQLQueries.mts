import { JQLQueryWithUnknownUsers } from './jQLQueryWithUnknownUsers.mjs';

/** The converted Jql queries. */
export interface ConvertedJQLQueries {
  /** List of queries containing user information that could not be mapped to an existing user */
  queriesWithUnknownUsers?: JQLQueryWithUnknownUsers[];
  /** The list of converted query strings with account IDs in place of user identifiers. */
  queryStrings?: string[];
}
