import { z } from 'zod';

/**
 * A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an
 * Atlassian account ID.
 */
export const UserContextVariableSchema = z.object({
  /** The account ID of the user. */
  accountId: z.string(),
  /** Type of custom context variable. */
  type: z.string(),
});

export type UserContextVariable = z.infer<typeof UserContextVariableSchema>;
