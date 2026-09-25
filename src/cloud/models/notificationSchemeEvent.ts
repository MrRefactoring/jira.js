import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationEventSchema, type NotificationEvent, type NotificationEventInput } from './notificationEvent';
import { EventNotificationSchema } from './eventNotification';

/** Details about a notification scheme event. */
export const NotificationSchemeEventSchema = apiObject({
  event: (NotificationEventSchema as z.ZodType<NotificationEvent, NotificationEventInput>).optional(),
  notifications: z.array(EventNotificationSchema).optional(),
});

export type NotificationSchemeEvent = z.infer<typeof NotificationSchemeEventSchema>;
