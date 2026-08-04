import { z } from 'zod';

export const GetAllUsersDefaultSchema = z.object({
  /** The index of the first item to return. */
  startAt: z.number().optional(),
  /** The maximum number of items to return (limited to 1000). */
  maxResults: z.number().optional(),
  expand: z.string().optional(),
});

export type GetAllUsersDefault = z.input<typeof GetAllUsersDefaultSchema>;
