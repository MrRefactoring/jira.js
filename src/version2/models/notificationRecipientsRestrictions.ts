import type { GroupName } from './groupName';
import type { RestrictedPermission } from './restrictedPermission';

/** Details of the group membership or permissions needed to receive the notification. */
export interface NotificationRecipientsRestrictions {
  /** List of groupId memberships required to receive the notification. */
  groupIds?: string[];
  /** List of group memberships required to receive the notification. */
  groups?: GroupName[];
  /** List of permissions required to receive the notification. */
  permissions?: RestrictedPermission[];
}
