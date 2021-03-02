import { ChangedWorklog } from './changedWorklog';

/**
 * List of changed worklogs. */
export interface ChangedWorklogs {
  /** Changed worklog list. */
  values?: ChangedWorklog[];
  /** The datetime of the first worklog item in the list. */
  since?: number;
  /** The datetime of the last worklog item in the list. */
  until?: number;
  /** The URL of this changed worklogs list. */
  self?: string;
  /** The URL of the next list of changed worklogs. */
  nextPage?: string;
  lastPage?: boolean;
}
