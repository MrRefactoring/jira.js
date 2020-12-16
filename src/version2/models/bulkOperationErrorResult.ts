import { ErrorCollection } from './errorCollection';

export interface BulkOperationErrorResult {
  status?: number;
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
}
