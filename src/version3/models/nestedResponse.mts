import type { ErrorCollection } from './errorCollection.mjs';

export interface NestedResponse {
  status?: number;
  errorCollection?: ErrorCollection;
}
