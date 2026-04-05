import { z } from 'zod';

/** The ID of an event that is being mapped to notifications. */
export const NotificationSchemeEventTypeIdSchema = z.object({
  /** The ID of the notification scheme event. */
  id: z.string(),
});

export type NotificationSchemeEventTypeId = z.infer<typeof NotificationSchemeEventTypeIdSchema>;
