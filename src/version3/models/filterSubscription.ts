import { User } from './user';
import { GroupName } from './groupName';

/**
 * Details of a user or group subscribing to a filter. */
export interface FilterSubscription {
  /** The ID of the filter subscription. */
  id?: number;
  /** The user subscribing to filter. */
  user?: User[];
  /** The group subscribing to filter. */
  group?: GroupName[];
}
