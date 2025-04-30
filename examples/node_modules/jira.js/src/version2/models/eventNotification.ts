import type { FieldDetails } from './fieldDetails';
import type { GroupName } from './groupName';
import type { ProjectRole } from './projectRole';
import type { UserDetails } from './userDetails';

/** Details about a notification associated with an event. */
export interface EventNotification {
  /** The email address. */
  emailAddress?: string;
  /** Expand options that include additional event notification details in the response. */
  expand?: string;
  field?: FieldDetails;
  group?: GroupName;
  /** The ID of the notification. */
  id?: number;
  /** Identifies the recipients of the notification. */
  notificationType?: string;
  /**
   * As a group's name can change, use of `recipient` is recommended. The identifier associated with the
   * `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by
   * `notificationType` value. So, when `notificationType` is:
   *
   * `User` The `parameter` is the user account ID. `Group` The `parameter` is the group name. `ProjectRole` The
   * `parameter` is the project role ID. `UserCustomField` The `parameter` is the ID of the custom field.
   * `GroupCustomField` The `parameter` is the ID of the custom field.
   */
  parameter?: string;
  projectRole?: ProjectRole;
  /**
   * The identifier associated with the `notificationType` value that defines the receiver of the notification, where
   * the receiver isn't implied by the `notificationType` value. So, when `notificationType` is:
   *
   * `User`, `recipient` is the user account ID. `Group`, `recipient` is the group ID. `ProjectRole`, `recipient` is the
   * project role ID. `UserCustomField`, `recipient` is the ID of the custom field. `GroupCustomField`, `recipient` is
   * the ID of the custom field.
   */
  recipient?: string;
  user?: UserDetails;
}
