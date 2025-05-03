import type { Changelog } from './changelog';

/** A page of changelogs. */
export interface PageOfChangelogs {
  /** The list of changelogs. */
  histories?: Changelog[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
}
