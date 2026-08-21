import { z } from 'zod';

export const FindUsersSchema = z.object({
  /** If true, then inactive users are included in the results (default false) */
  includeInactive: z.boolean().optional(),
  /**
   * The maximum number of users to return (defaults to 50). The maximum allowed value is 100 (The combination of
   * maxResults and startAt is limited to the first 100 results). If you specify a value that is higher than this
   * number, your search results will be truncated. If you send a request with startAt=98 and maxResults=20, it will
   * only return 2 users.
   */
  maxResults: z.number().optional(),
  /** If true, then active users are included in the results (default true) */
  includeActive: z.boolean().optional(),
  /**
   * The index of the first user to return (0-based). Please note that the startAt parameter will be deprecated in a
   * future release of Jira 10.3.x
   */
  startAt: z.number().optional(),
  /** A query string used to search username, name or e-mail address */
  username: z.string().optional(),
});

export type FindUsers = z.input<typeof FindUsersSchema>;
