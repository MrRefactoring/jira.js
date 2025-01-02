import type { ErrorCollection } from './errorCollection.js';

export interface NestedResponse {
  status?: number;
  errorCollection?: ErrorCollection;
}
