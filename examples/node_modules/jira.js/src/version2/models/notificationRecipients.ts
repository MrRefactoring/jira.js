import type { GroupName } from './groupName';
import type { UserDetails } from './userDetails';

/** Details of the users and groups to receive the notification. */
export interface NotificationRecipients {
  /** Whether the notification should be sent to the issue's assignees. */
  assignee?: boolean;
  /** List of groupIds to receive the notification. */
  groupIds?: string[];
  /** List of groups to receive the notification. */
  groups?: GroupName[];
  /** Whether the notification should be sent to the issue's reporter. */
  reporter?: boolean;
  /** List of users to receive the notification. */
  users?: UserDetails[];
  /** Whether the notification should be sent to the issue's voters. */
  voters?: boolean;
  /** Whether the notification should be sent to the issue's watchers. */
  watchers?: boolean;
}
