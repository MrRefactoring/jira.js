import type { ChangedWorklog } from './changedWorklog';

/** List of changed worklogs. */
export interface ChangedWorklogs {
  lastPage?: boolean;
  /** The URL of the next list of changed worklogs. */
  nextPage?: string;
  /** The URL of this changed worklogs list. */
  self?: string;
  /** The datetime of the first worklog item in the list. */
  since?: number;
  /** The datetime of the last worklog item in the list. */
  until?: number;
  /** Changed worklog list. */
  values?: ChangedWorklog[];
}
