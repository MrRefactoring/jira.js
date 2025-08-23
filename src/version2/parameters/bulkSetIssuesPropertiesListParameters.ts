import { z } from 'zod';

export const BulkSetIssuesPropertiesListParametersSchema = z.object({
  /** A list of entity property IDs. */
  entitiesIds: z.array(z.number().int()).optional(),
  /** A list of entity property keys and values. */
  properties: z.object({}).optional(),
});

export type BulkSetIssuesPropertiesListParameters = z.infer<typeof BulkSetIssuesPropertiesListParametersSchema>;
