import { z } from 'zod';
import { apiObject } from '#/core';
/** The event ID to use for reference in the payload */

export const NotificationSchemeEventIDPayloadSchema = apiObject({
  /** The event ID to use for reference in the payload */
  id: z.string().optional(),
});

export type NotificationSchemeEventIDPayload = z.infer<typeof NotificationSchemeEventIDPayloadSchema>;
