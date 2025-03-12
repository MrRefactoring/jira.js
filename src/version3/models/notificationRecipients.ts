import type { GroupName } from './groupName';
import type { UserDetails } from './userDetails';

/** Details of the users and groups to receive the notification. */
export interface NotificationRecipients {
  /** Whether the notification should be sent to the issue's reporter. */
  reporter?: boolean;
  /** Whether the notification should be sent to the issue's assignees. */
  assignee?: boolean;
  /** Whether the notification should be sent to the issue's watchers. */
  watchers?: boolean;
  /** Whether the notification should be sent to the issue's voters. */
  voters?: boolean;
  /** List of users to receive the notification. */
  users?: UserDetails[];
  /** List of groups to receive the notification. */
  groups?: GroupName[];
  /** List of groupIds to receive the notification. */
  groupIds?: string[];
}
