import { z } from 'zod';

export const MigrateQueriesParametersSchema = z.object({
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings: z.array(z.string()).optional(),
});

export type MigrateQueriesParameters = z.infer<typeof MigrateQueriesParametersSchema>;
