import { Changelog } from './changelog';

/**
 * A page of changelogs. */
export interface PageOfChangelogs {
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The number of results on the page. */
  total?: number;
  /** The list of changelogs. */
  histories?: Changelog[];
}
