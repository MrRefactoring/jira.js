import { z } from 'zod';
import { NotificationSchemeNotificationDetailsSchema } from './notificationSchemeNotificationDetails';

/** Details of a notification scheme event. */
export const NotificationSchemeEventDetailsSchema = z.object({
  /** The ID of the event. */
  event: z.unknown(),
  /** The list of notifications mapped to a specified event. */
  notifications: z.array(NotificationSchemeNotificationDetailsSchema),
});

export type NotificationSchemeEventDetails = z.infer<typeof NotificationSchemeEventDetailsSchema>;
