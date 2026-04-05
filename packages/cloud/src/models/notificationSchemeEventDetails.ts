import { z } from 'zod';
import { NotificationSchemeEventTypeIdSchema } from '#/models/notificationSchemeEventTypeId';
import { NotificationSchemeNotificationDetailsSchema } from '#/models/notificationSchemeNotificationDetails';

/** Details of a notification scheme event. */
export const NotificationSchemeEventDetailsSchema = z.object({
  event: NotificationSchemeEventTypeIdSchema.optional(),
  /** The list of notifications mapped to a specified event. */
  notifications: z.array(NotificationSchemeNotificationDetailsSchema),
});

export type NotificationSchemeEventDetails = z.infer<typeof NotificationSchemeEventDetailsSchema>;
