export interface PagedLink {
  /** REST API URL for the current page. */
  self?: string;
  /** Base URL for the REST API calls. */
  base?: string;
  context?: string;
  /** REST API URL for the next page, if there is one. */
  next?: string;
  /** REST API URL for the previous page, if there is one. */
  prev?: string;
}
