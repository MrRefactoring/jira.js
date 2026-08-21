import { z } from 'zod';

export const GetNotificationSchemesSchema = z.object({
  /** Optional information to be expanded in the response: group, user, projectRole or field. */
  expand: z.string().optional(),
  /** The maximum number of notification schemes to return (max 50). */
  maxResults: z.number().optional(),
  /** The index of the first notification scheme to return (0 based). */
  startAt: z.number().optional(),
});

export type GetNotificationSchemes = z.input<typeof GetNotificationSchemesSchema>;
