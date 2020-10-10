import { JQLQueryWithUnknownUsers } from './jQLQueryWithUnknownUsers';

export interface ConvertedJQLQueries {
  queryStrings: string[];
  queriesWithUnknownUsers: JQLQueryWithUnknownUsers[];
}
