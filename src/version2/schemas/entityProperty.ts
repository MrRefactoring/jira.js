import { z } from 'zod';

/**
 * An entity property, for more information see [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 */
export const EntityPropertySchema = z.object({
  /** The key of the property. Required on create and update. */
  key: z.string().optional(),
  /** The value of the property. Required on create and update. */
  value: z.unknown().optional(),
});

export type EntityProperty = z.infer<typeof EntityPropertySchema>;
