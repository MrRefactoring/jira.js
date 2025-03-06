import type { ErrorCollection } from './errorCollection';

export interface NestedResponse {
  status?: number;
  errorCollection?: ErrorCollection;
}
