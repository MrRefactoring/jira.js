import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID
 * or key. All the fields of the issue object are available in the Jira expression.
 */

export const IssueContextVariableSchema = apiObject({
  /** The issue ID. */
  id: z.number().optional(),
  /** The issue key. */
  key: z.string().optional(),
  /** Type of custom context variable. */
  type: z.string(),
});

export type IssueContextVariable = z.infer<typeof IssueContextVariableSchema>;
