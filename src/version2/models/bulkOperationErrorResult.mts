import type { ErrorCollection } from './errorCollection.mjs';

export interface BulkOperationErrorResult {
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
  status?: number;
}
