import type { ErrorCollection } from './errorCollection';
import type { WarningCollection } from './warningCollection';

export interface NestedResponse {
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
}
