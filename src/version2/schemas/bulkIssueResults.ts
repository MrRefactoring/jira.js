import { z } from 'zod';
import { IssueErrorSchema } from './issueError';
import { IssueBeanSchema } from './issueBean';

/** The list of requested issues & fields. */
export const BulkIssueResultsSchema = z.object({
  /**
   * When Jira can't return an issue enumerated in a request due to a retriable error or payload constraint, we'll
   * return the respective issue ID with a corresponding error message. This list is empty when there are no errors
   * Issues which aren't found or that the user doesn't have permission to view won't be returned in this list.
   */
  issueErrors: z.array(IssueErrorSchema).optional(),
  /** The list of issues. */
  issues: z.array(IssueBeanSchema).optional(),
});

export type BulkIssueResults = z.infer<typeof BulkIssueResultsSchema>;
