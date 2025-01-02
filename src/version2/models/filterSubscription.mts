import type { GroupName } from './groupName.mjs';
import { User } from './user.mjs';

/** Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  group?: GroupName;
  /** The ID of the filter subscription. */
  id?: number;
  user?: User;
}
