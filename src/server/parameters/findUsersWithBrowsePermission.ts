import { z } from 'zod';

export const FindUsersWithBrowsePermissionSchema = z.object({
  /** The optional project key to search for users with if no issueKey is supplied. */
  projectKey: z.string().optional(),
  /** The issue key for the issue being edited we need to find viewable users for. */
  issueKey: z.string().optional(),
  /**
   * The maximum number of users to return (defaults to 50). The maximum allowed value is 100 (The combination of
   * maxResults and startAt is limited to the first 100 results). If you specify a value that is higher than this
   * number, your search results will be truncated. If you send a request with startAt=98 and maxResults=20, it will
   * only return 2 users.
   */
  maxResults: z.number().optional(),
  /** The username filter, no users returned if left blank */
  username: z.string().optional(),
});

export type FindUsersWithBrowsePermission = z.input<typeof FindUsersWithBrowsePermissionSchema>;
