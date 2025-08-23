import { z } from 'zod';
import { GroupNameSchema } from './groupName';
import { RestrictedPermissionSchema } from './restrictedPermission';

/** Details of the group membership or permissions needed to receive the notification. */
export const NotificationRecipientsRestrictionsSchema = z.object({
  /** List of groupId memberships required to receive the notification. */
  groupIds: z.array(z.string()).optional(),
  /** List of group memberships required to receive the notification. */
  groups: z.array(GroupNameSchema).optional(),
  /** List of permissions required to receive the notification. */
  permissions: z.array(RestrictedPermissionSchema).optional(),
});

export type NotificationRecipientsRestrictions = z.infer<typeof NotificationRecipientsRestrictionsSchema>;
