import { User } from './user';

/** The details of votes on an issue. */
export interface Votes {
  /** The URL of these issue vote details. */
  self?: string;
  /** The number of votes on the issue. */
  votes?: number;
  /** Whether the user making this request has voted on the issue. */
  hasVoted?: boolean;
  /**
   * List of the users who have voted on this issue. An empty list is returned when the calling user doesn't have the
   * *View voters and watchers* project permission.
   */
  voters?: User[];
}
