import { z } from 'zod';
import { UserPickerUserSchema } from '#/models/userPickerUser';

/**
 * The list of users found in a search, including header text (Showing X of Y matching users) and total of matched
 * users.
 */
export const FoundUsersSchema = z.object({
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header: z.string().optional(),
  /** The total number of users found in the search. */
  total: z.number().optional(),
  users: z.array(UserPickerUserSchema).optional(),
});

export type FoundUsers = z.infer<typeof FoundUsersSchema>;
