import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of an event that is being mapped to notifications. */

export const NotificationSchemeEventTypeIdSchema = apiObject({
  /** The ID of the notification scheme event. */
  id: z.string(),
});

export type NotificationSchemeEventTypeId = z.infer<typeof NotificationSchemeEventTypeIdSchema>;
