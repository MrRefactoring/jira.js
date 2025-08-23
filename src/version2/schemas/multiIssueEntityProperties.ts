import { z } from 'zod';
import { IssueEntityPropertiesForMultiUpdateSchema } from './issueEntityPropertiesForMultiUpdate';

/**
 * A list of issues and their respective properties to set or update. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export const MultiIssueEntityPropertiesSchema = z.object({
  /** A list of issue IDs and their respective properties. */
  issues: z.array(IssueEntityPropertiesForMultiUpdateSchema).optional(),
});

export type MultiIssueEntityProperties = z.infer<typeof MultiIssueEntityPropertiesSchema>;
