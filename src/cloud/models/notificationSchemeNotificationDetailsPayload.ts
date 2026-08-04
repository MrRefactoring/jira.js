import { z } from 'zod';
import { apiObject } from '#/core';
/** The configuration for notification recipents */

export const NotificationSchemeNotificationDetailsPayloadSchema = apiObject({
  /** The type of notification. */
  notificationType: z.string().optional(),
  /** The parameter of the notification, should be eiither null if not required, or PCRI. */
  parameter: z.string().optional(),
});

export type NotificationSchemeNotificationDetailsPayload = z.infer<
  typeof NotificationSchemeNotificationDetailsPayloadSchema
>;
