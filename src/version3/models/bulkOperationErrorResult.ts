import type { ErrorCollection } from './errorCollection.js';

export interface BulkOperationErrorResult {
  status?: number;
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
}
