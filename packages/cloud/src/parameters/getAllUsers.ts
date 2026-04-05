import { z } from 'zod';

export const GetAllUsersSchema = z.object({
  /** The index of the first item to return. */
  startAt: z.number().optional(),
  /** The maximum number of items to return (limited to 1000). */
  maxResults: z.number().optional(),
  expand: z.string().optional(),
});

export type GetAllUsers = z.input<typeof GetAllUsersSchema>;
