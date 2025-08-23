import { z } from 'zod';

/**
 * An issue ID with entity property values. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export const IssueEntityPropertiesForMultiUpdateSchema = z.object({
  /** The ID of the issue. */
  issueID: z.number().int().optional(),
  /** Entity properties to set on the issue. The maximum length of an issue property value is 32768 characters. */
  properties: z.object({}).optional(),
});

export type IssueEntityPropertiesForMultiUpdate = z.infer<typeof IssueEntityPropertiesForMultiUpdateSchema>;
