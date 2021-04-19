export interface GetFieldsPaginated {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The type of fields to search. */
  type?: string[];
  /** The IDs of the custom fields to return or, where `query` is specified, filter. */
  id?: string[];
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query?: string;
  /** [Order](#ordering) the results by a field:

   *  `contextsCount` Sorts by the number of contexts related to a field.
   *  `lastUsed` Sorts by the date when the value of the field last changed.
   *  `name` Sorts by the field name.
   *  `screensCount` Sorts by the number of screens related to a field. */
  orderBy?: string;
  /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:

   *  `key` Returns the key for each field.
   *  `lastUsed` Returns the date when the value of the field last changed.
   *  `screensCount` Returns the number of screens related to a field.
   *  `contextsCount` Returns the number of contexts related to a field.
   *  `isLocked` Returns information about whether the field is [locked](https://confluence.atlassian.com/x/ZSN7Og).
   *  `searcherKey` Returns the searcher key for each custom field. */
  expand?: string;
}
