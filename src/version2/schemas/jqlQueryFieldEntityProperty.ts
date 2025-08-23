import { z } from 'zod';

/** Details of an entity property. */
export const JqlQueryFieldEntityPropertySchema = z.object({
  /** The object on which the property is set. */
  entity: z.string(),
  /** The key of the property. */
  key: z.string(),
  /** The path in the property value to query. */
  path: z.string(),
  /**
   * The type of the property value extraction. Not available if the extraction for the property is not registered on
   * the instance with the [Entity
   * property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module.
   */
  type: z.enum(['number', 'string', 'text', 'date', 'user']).optional(),
});

export type JqlQueryFieldEntityProperty = z.infer<typeof JqlQueryFieldEntityPropertySchema>;
