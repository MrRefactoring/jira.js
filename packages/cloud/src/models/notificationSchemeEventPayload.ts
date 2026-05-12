import { z } from 'zod';
import { NotificationSchemeEventIDPayloadSchema } from '#/models/notificationSchemeEventIDPayload';
import { NotificationSchemeNotificationDetailsPayloadSchema } from '#/models/notificationSchemeNotificationDetailsPayload';

/** The payload for creating a notification scheme event. Defines which notifications should be sent for a specific event */
export const NotificationSchemeEventPayloadSchema = z.object({
  event: NotificationSchemeEventIDPayloadSchema.optional(),
  /** The configuration for notification recipents */
  notifications: z.array(NotificationSchemeNotificationDetailsPayloadSchema).optional(),
});

export type NotificationSchemeEventPayload = z.infer<typeof NotificationSchemeEventPayloadSchema>;
