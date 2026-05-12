import { z } from 'zod';

/** Details of a notification within a notification scheme. */
export const NotificationSchemeNotificationDetailsSchema = z.object({
  /** The notification type, e.g `CurrentAssignee`, `Group`, `EmailAddress`. */
  notificationType: z.string(),
  /** The value corresponding to the specified notification type. */
  parameter: z.string().optional(),
});

export type NotificationSchemeNotificationDetails = z.infer<typeof NotificationSchemeNotificationDetailsSchema>;
