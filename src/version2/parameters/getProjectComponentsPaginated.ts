export interface GetProjectComponentsPaginated {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** [Order](#ordering) the results by a field:

   *  `description` Sorts by the component description.
   *  `issueCount` Sorts by the count of issues associated with the component.
   *  `lead` Sorts by the user key of the component's project lead.
   *  `name` Sorts by component name. */
  orderBy?: string;
  /** Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive). */
  query?: string;
}
