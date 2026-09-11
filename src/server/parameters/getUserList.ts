import { z } from 'zod';

export const GetUserListSchema = z.object({
  /** The position in the stream to continue iterating over all users. */
  cursor: z.number().optional(),
  /** The maximum number of users to return per page (defaults to 2000). */
  maxResults: z.number().optional(),
});

export type GetUserList = z.input<typeof GetUserListSchema>;
