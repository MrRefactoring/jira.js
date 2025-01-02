import type { ErrorCollection } from './errorCollection.js';
import type { WarningCollection } from './warningCollection.js';

export interface NestedResponse {
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
}
