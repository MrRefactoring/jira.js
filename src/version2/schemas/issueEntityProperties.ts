import { z } from 'zod';

/**
 * Lists of issues and entity properties. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export const IssueEntityPropertiesSchema = z.object({
  /** A list of entity property IDs. */
  entitiesIds: z.array(z.number().int()).optional(),
  /** A list of entity property keys and values. */
  properties: z.object({}).optional(),
});

export type IssueEntityProperties = z.infer<typeof IssueEntityPropertiesSchema>;
