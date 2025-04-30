import type { GroupName } from './groupName';
import type { User } from './user';

/** Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  group?: GroupName;
  /** The ID of the filter subscription. */
  id?: number;
  user?: User;
}
