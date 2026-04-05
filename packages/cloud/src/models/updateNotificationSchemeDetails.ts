import { z } from 'zod';

/** Details of a notification scheme. */
export const UpdateNotificationSchemeDetailsSchema = z.object({
  /** The description of the notification scheme. */
  description: z.string().max(4000, 'description must be at most 4000 characters').optional(),
  /** The name of the notification scheme. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters').optional(),
});

export type UpdateNotificationSchemeDetails = z.infer<typeof UpdateNotificationSchemeDetailsSchema>;
