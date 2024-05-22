import type { GroupName } from './groupName.js';
import type { User } from './user.js';

/** Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  group?: GroupName;
  /** The ID of the filter subscription. */
  id?: number;
  user?: User;
}
