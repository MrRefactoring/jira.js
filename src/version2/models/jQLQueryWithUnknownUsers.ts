/** JQL queries that contained users that could not be found */
export interface JQLQueryWithUnknownUsers {
  /** The converted query, with accountIDs instead of user identifiers, or 'unknown' for users that could not be found */
  convertedQuery?: string;
  /** The original query, for reference */
  originalQuery?: string;
}
