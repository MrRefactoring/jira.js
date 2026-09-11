import { z } from 'zod';

export const FindAssignableUsersSchema = z.object({
  /** The issue key for the issue being edited we need to find assignable users for. */
  issueKey: z.string().optional(),
  /**
   * The maximum number of users to return (defaults to 50). The maximum allowed value is 100 (The combination of
   * maxResults and startAt is limited to the first 100 results). If you specify a value that is higher than this
   * number, your search results will be truncated. If you send a request with startAt=98 and maxResults=20, it will
   * only return 2 users.
   */
  maxResults: z.number().optional(),
  project: z.string().optional(),
  actionDescriptorId: z.number().optional(),
  /** The username */
  username: z.string().optional(),
});

export type FindAssignableUsers = z.input<typeof FindAssignableUsersSchema>;
