import type { Project } from './project';

/** A page of items. */
export interface PageProject {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values: Project[];
}
