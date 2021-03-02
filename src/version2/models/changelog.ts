import { UserDetails } from './userDetails';
import { ChangeDetails } from './changeDetails';
import { HistoryMetadata } from './historyMetadata';

/**
 * A changelog. */
export interface Changelog {
  /** The ID of the changelog. */
  id?: string;
  /** The user who made the change. */
  author?: UserDetails[];
  /** The date on which the change took place. */
  created?: string;
  /** The list of items changed. */
  items?: ChangeDetails[];
  /** The history metadata associated with the changed. */
  historyMetadata?: HistoryMetadata[];
}
