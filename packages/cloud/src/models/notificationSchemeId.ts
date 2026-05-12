import { z } from 'zod';

/** The ID of a notification scheme. */
export const NotificationSchemeIdSchema = z.object({
  /** The ID of a notification scheme. */
  id: z.string(),
});

export type NotificationSchemeId = z.infer<typeof NotificationSchemeIdSchema>;
