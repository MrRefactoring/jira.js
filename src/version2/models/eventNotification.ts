import { GroupName } from './groupName';
import { FieldDetails } from './fieldDetails';
import { ProjectRole } from './projectRole';
import { UserDetails } from './userDetails';

/**
 * Details about a notification associated with an event. */
export interface EventNotification {
  /** Expand options that include additional event notification details in the response. */
  expand?: string;
  /** The ID of the notification. */
  id?: number;
  /** Identifies the recipients of the notification. */
  notificationType?: string;
  /** The value of the `notificationType`:

     *  `User` The `parameter` is the user account ID.
     *  `Group` The `parameter` is the group name.
     *  `ProjectRole` The `parameter` is the project role ID.
     *  `UserCustomField` The `parameter` is the ID of the custom field.
     *  `GroupCustomField` The `parameter` is the ID of the custom field. */
  parameter?: string;
  /** The specified group. */
  group?: GroupName[];
  /** The custom user or group field. */
  field?: FieldDetails[];
  /** The email address. */
  emailAddress?: string;
  /** The specified project role. */
  projectRole?: ProjectRole[];
  /** The specified user. */
  user?: UserDetails[];
}
