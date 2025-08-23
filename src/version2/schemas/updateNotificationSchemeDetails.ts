import { z } from 'zod';

/** Details of a notification scheme. */
export const UpdateNotificationSchemeDetailsSchema = z.object({
  /** The description of the notification scheme. */
  description: z.string().optional(),
  /** The name of the notification scheme. Must be unique. */
  name: z.string().optional(),
});

export type UpdateNotificationSchemeDetails = z.infer<typeof UpdateNotificationSchemeDetailsSchema>;
