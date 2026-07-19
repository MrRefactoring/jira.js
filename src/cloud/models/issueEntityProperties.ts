import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * Lists of issues and entity properties. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */

export const IssueEntityPropertiesSchema = apiObject({
  /** A list of entity property IDs. */
  entitiesIds: z.array(z.number()).optional(),
  /** A list of entity property keys and values. */
  properties: z.record(z.string(), z.any()).optional(),
});

export type IssueEntityProperties = z.infer<typeof IssueEntityPropertiesSchema>;
