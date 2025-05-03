import type { ErrorCollection } from './errorCollection';

export interface BulkOperationErrorResult {
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
  status?: number;
}
