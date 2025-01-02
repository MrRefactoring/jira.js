import type { ErrorCollection } from './errorCollection.mjs';

export interface BulkOperationErrorResult {
  status?: number;
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
}
