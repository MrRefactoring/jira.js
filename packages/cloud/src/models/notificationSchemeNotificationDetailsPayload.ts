import { z } from 'zod';

/** The configuration for notification recipents */
export const NotificationSchemeNotificationDetailsPayloadSchema = z.object({
  /** The type of notification. */
  notificationType: z.string().optional(),
  /** The parameter of the notification, should be eiither null if not required, or PCRI. */
  parameter: z.string().optional(),
});

export type NotificationSchemeNotificationDetailsPayload = z.infer<
  typeof NotificationSchemeNotificationDetailsPayloadSchema
>;
