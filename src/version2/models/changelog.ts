import type { ChangeDetails } from './changeDetails.js';
import type { HistoryMetadata } from './historyMetadata.js';
import type { UserDetails } from './userDetails.js';

/** A log of changes made to issue fields. Changelogs related to workflow associations are currently being deprecated. */
export interface Changelog {
  author?: UserDetails;
  /** The date on which the change took place. */
  created?: string;
  historyMetadata?: HistoryMetadata;
  /** The ID of the changelog. */
  id?: string;
  /** The list of items changed. */
  items?: ChangeDetails[];
}
