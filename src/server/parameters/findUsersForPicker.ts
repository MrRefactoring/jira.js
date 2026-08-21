import { z } from 'zod';

export const FindUsersForPickerSchema = z.object({
  /**
   * The maximum number of users to return (defaults to 50). The maximum allowed value is 100 (The combination of
   * maxResults and startAt is limited to the first 100 results). If you specify a value that is higher than this
   * number, your search results will be truncated. If you send a request with startAt=98 and maxResults=20, it will
   * only return 2 users.
   */
  maxResults: z.number().optional(),
  /** A string used to search username, Name or e-mail address */
  query: z.string().optional(),
  /** List of users to be excluded from the search results */
  exclude: z.array(z.string()).optional(),
  /** If true, then avatars are included in the results */
  showAvatar: z.boolean().optional(),
});

export type FindUsersForPicker = z.input<typeof FindUsersForPickerSchema>;
