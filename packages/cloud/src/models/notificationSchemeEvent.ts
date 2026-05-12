import { z } from 'zod';
import { NotificationEventSchema } from '#/models/notificationEvent';
import { EventNotificationSchema } from '#/models/eventNotification';

/** Details about a notification scheme event. */
export const NotificationSchemeEventSchema = z.object({
  event: NotificationEventSchema.optional(),
  notifications: z.array(EventNotificationSchema).optional(),
});

export type NotificationSchemeEvent = z.infer<typeof NotificationSchemeEventSchema>;
