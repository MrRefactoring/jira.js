import { Date } from './date';

export interface CustomerRequestStatus {
  /** Name of the status condition. */
  status?: string;
  /** Status category the status belongs to. */
  statusCategory?: string;
  statusDate?: Date;
}
