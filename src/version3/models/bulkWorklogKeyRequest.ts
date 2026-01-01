import type { WorklogCompositeKey } from './worklogCompositeKey';

export interface BulkWorklogKeyRequest {
  /** A list of issue and worklog ID pairs. */
  requests?: WorklogCompositeKey[];
}
