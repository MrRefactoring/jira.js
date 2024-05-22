import type { ErrorCollection } from './errorCollection.js';

export interface BulkOperationErrorResult {
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
  status?: number;
}
