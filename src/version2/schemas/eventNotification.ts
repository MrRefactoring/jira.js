import { z } from 'zod';

/** Details about a notification associated with an event. */
export const EventNotificationSchema = z.object({
  /** The email address. */
  emailAddress: z.string().optional(),
  /** Expand options that include additional event notification details in the response. */
  expand: z.string().optional(),
  /** The custom user or group field. */
  field: z.unknown().optional(),
  /** The specified group. */
  group: z.unknown().optional(),
  /** The ID of the notification. */
  id: z.number().int().optional(),
  /** Identifies the recipients of the notification. */
  notificationType: z
    .enum([
      'CurrentAssignee',
      'Reporter',
      'CurrentUser',
      'ProjectLead',
      'ComponentLead',
      'User',
      'Group',
      'ProjectRole',
      'EmailAddress',
      'AllWatchers',
      'UserCustomField',
      'GroupCustomField',
    ])
    .optional(),
  /**
   * As a group's name can change, use of `recipient` is recommended. The identifier associated with the
   * `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by
   * `notificationType` value. So, when `notificationType` is:
   *
   * - `User` The `parameter` is the user account ID.
   * - `Group` The `parameter` is the group name.
   * - `ProjectRole` The `parameter` is the project role ID.
   * - `UserCustomField` The `parameter` is the ID of the custom field.
   * - `GroupCustomField` The `parameter` is the ID of the custom field.
   */
  parameter: z.string().optional(),
  /** The specified project role. */
  projectRole: z.unknown().optional(),
  /**
   * The identifier associated with the `notificationType` value that defines the receiver of the notification, where
   * the receiver isn't implied by the `notificationType` value. So, when `notificationType` is:
   *
   * - `User`, `recipient` is the user account ID.
   * - `Group`, `recipient` is the group ID.
   * - `ProjectRole`, `recipient` is the project role ID.
   * - `UserCustomField`, `recipient` is the ID of the custom field.
   * - `GroupCustomField`, `recipient` is the ID of the custom field.
   */
  recipient: z.string().optional(),
  /** The specified user. */
  user: z.unknown().optional(),
});

export type EventNotification = z.infer<typeof EventNotificationSchema>;
