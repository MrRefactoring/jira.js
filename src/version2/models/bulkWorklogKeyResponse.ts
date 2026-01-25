import type { WorklogKeyResult } from './worklogKeyResult';

export interface BulkWorklogKeyResponse {
  /** A list of successfully retrieved worklogs with their issue and worklog IDs. */
  worklogs?: WorklogKeyResult[];
}
