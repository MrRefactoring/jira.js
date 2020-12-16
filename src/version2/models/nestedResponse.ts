import { ErrorCollection } from './errorCollection';

export interface NestedResponse {
  status?: number;
  errorCollection?: ErrorCollection;
}
