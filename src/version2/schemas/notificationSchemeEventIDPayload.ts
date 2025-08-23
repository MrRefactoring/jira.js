import { z } from 'zod';

/** The event ID to use for reference in the payload */
export const NotificationSchemeEventIDPayloadSchema = z.object({
  /** The event ID to use for reference in the payload */
  id: z.string().optional(),
});

export type NotificationSchemeEventIDPayload = z.infer<typeof NotificationSchemeEventIDPayloadSchema>;
