import { z } from 'zod';
import { NotificationEventSchema } from './notificationEvent';
import { EventNotificationSchema } from './eventNotification';

/** Details about a notification scheme event. */
export const NotificationSchemeEventSchema = z.object({
  event: NotificationEventSchema.optional(),
  notifications: z.array(EventNotificationSchema).optional(),
});

export type NotificationSchemeEvent = z.infer<typeof NotificationSchemeEventSchema>;
