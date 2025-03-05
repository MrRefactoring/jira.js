import type { UserDetails } from './userDetails';

/** The details of watchers on an issue. */
export interface Watchers {
  /** Whether the calling user is watching this issue. */
  isWatching?: boolean;
  /** The URL of these issue watcher details. */
  self?: string;
  /** The number of users watching this issue. */
  watchCount?: number;
  /** Details of the users watching this issue. */
  watchers?: UserDetails[];
}
