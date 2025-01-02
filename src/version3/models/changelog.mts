import { ChangeDetails } from './changeDetails.mjs';
import { HistoryMetadata } from './historyMetadata.mjs';
import { UserDetails } from './userDetails.mjs';

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
