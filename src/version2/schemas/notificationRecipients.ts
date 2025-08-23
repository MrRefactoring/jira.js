import { z } from 'zod';
import { GroupNameSchema } from './groupName';
import { UserDetailsSchema } from './userDetails';

/** Details of the users and groups to receive the notification. */
export const NotificationRecipientsSchema = z.object({
  /** Whether the notification should be sent to the issue's assignees. */
  assignee: z.boolean().optional(),
  /** List of groupIds to receive the notification. */
  groupIds: z.array(z.string()).optional(),
  /** List of groups to receive the notification. */
  groups: z.array(GroupNameSchema).optional(),
  /** Whether the notification should be sent to the issue's reporter. */
  reporter: z.boolean().optional(),
  /** List of users to receive the notification. */
  users: z.array(UserDetailsSchema).optional(),
  /** Whether the notification should be sent to the issue's voters. */
  voters: z.boolean().optional(),
  /** Whether the notification should be sent to the issue's watchers. */
  watchers: z.boolean().optional(),
});

export type NotificationRecipients = z.infer<typeof NotificationRecipientsSchema>;
