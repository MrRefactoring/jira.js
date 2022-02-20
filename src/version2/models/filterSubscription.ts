import { GroupName } from './groupName';
import { User } from './user';

/** Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  /** The ID of the filter subscription. */
  id?: number;
  user?: User;
  group?: GroupName;
}
