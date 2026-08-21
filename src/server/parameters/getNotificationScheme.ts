import { z } from 'zod';

export const GetNotificationSchemeSchema = z.object({
  /** Optional information to be expanded in the response: group, user, projectRole or field. */
  expand: z.string().optional(),
  /** The id of the notification scheme to retrieve */
  id: z.number(),
});

export type GetNotificationScheme = z.input<typeof GetNotificationSchemeSchema>;
