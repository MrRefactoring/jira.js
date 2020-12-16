import { IssueBean } from './issueBean';

export interface SearchResultsBean {
  /** Expand options that include additional search result details in the response. */
  expand?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The number of results on the page. */
  total?: number;
  /** The list of issues found by the search. */
  issues?: IssueBean[];
  /** Any warnings related to the JQL query. */
  warningMessages?: string[];
  /** The ID and name of each field in the search results. */
  names?: {};
  /** The schema describing the field types in the search results. */
  schema?: {};
}
