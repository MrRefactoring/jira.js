import type { ErrorCollection } from './errorCollection.mjs';
import { WarningCollection } from './warningCollection.mjs';

export interface NestedResponse {
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
}
