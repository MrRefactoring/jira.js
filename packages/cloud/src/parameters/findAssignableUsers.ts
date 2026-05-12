import { z } from 'zod';

export const FindAssignableUsersSchema = z.object({
  /**
   * A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant
   * users. The string can match the prefix of the attribute's value. For example, _query=john_ matches a user with a
   * `displayName` of _John Smith_ and a user with an `emailAddress` of _johnson@example.com_. Required, unless
   * `username` or `accountId` is specified.
   */
  query: z.string().optional(),
  /** The sessionId of this request. SessionId is the same until the assignee is set. */
  sessionId: z.string().optional(),
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
  /** The project ID or project key (case sensitive). Required, unless `issueKey` or `issueId` is specified. */
  project: z.string().optional(),
  /** The key of the issue. Required, unless `issueId` or `project` is specified. */
  issueKey: z.string().optional(),
  /** The ID of the issue. Required, unless `issueKey` or `project` is specified. */
  issueId: z.string().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /**
   * The maximum number of items to return. This operation may return less than the maximum number of items even if more
   * are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the
   * users that can be assigned to the issue.
   */
  maxResults: z.number().optional(),
  /** The ID of the transition. */
  actionDescriptorId: z.number().optional(),
  recommend: z.boolean().optional(),
  accountType: z.array(z.string()).optional(),
  appType: z.array(z.string()).optional(),
});

export type FindAssignableUsers = z.input<typeof FindAssignableUsersSchema>;
