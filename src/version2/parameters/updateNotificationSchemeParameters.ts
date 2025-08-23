import { z } from 'zod';

export const UpdateNotificationSchemeParametersSchema = z.object({
  /** The ID of the notification scheme. */
  id: z.string(),
  /** The description of the notification scheme. */
  description: z.string().optional(),
  /** The name of the notification scheme. Must be unique. */
  name: z.string().optional(),
});

export type UpdateNotificationSchemeParameters = z.infer<typeof UpdateNotificationSchemeParametersSchema>;
