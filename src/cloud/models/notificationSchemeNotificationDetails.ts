import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a notification within a notification scheme. */

export const NotificationSchemeNotificationDetailsSchema = apiObject({
  /** The notification type, e.g `CurrentAssignee`, `Group`, `EmailAddress`. */
  notificationType: z.string(),
  /** The value corresponding to the specified notification type. */
  parameter: z.string().optional(),
});

export type NotificationSchemeNotificationDetails = z.infer<typeof NotificationSchemeNotificationDetailsSchema>;
