import type { ChangeDetails } from './changeDetails.js';
import type { HistoryMetadata } from './historyMetadata.js';
import type { UserDetails } from './userDetails.js';

/** A changelog. */
export interface Changelog {
  /** The ID of the changelog. */
  id?: string;
  author?: UserDetails;
  /** The date on which the change took place. */
  created?: string;
  /** The list of items changed. */
  items?: ChangeDetails[];
  historyMetadata?: HistoryMetadata;
}
