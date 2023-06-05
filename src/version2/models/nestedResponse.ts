import { ErrorCollection } from './errorCollection';
import { WarningCollection } from './warningCollection';

export interface NestedResponse {
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
}
