import { z } from 'zod';
import { NotificationSchemeEventIDPayloadSchema } from './notificationSchemeEventIDPayload';
import { NotificationSchemeNotificationDetailsPayloadSchema } from './notificationSchemeNotificationDetailsPayload';

/** The payload for creating a notification scheme event. Defines which notifications should be sent for a specific event */
export const NotificationSchemeEventPayloadSchema = z.object({
  event: NotificationSchemeEventIDPayloadSchema.optional(),
  /** The configuration for notification recipents */
  notifications: z.array(NotificationSchemeNotificationDetailsPayloadSchema).optional(),
});

export type NotificationSchemeEventPayload = z.infer<typeof NotificationSchemeEventPayloadSchema>;
