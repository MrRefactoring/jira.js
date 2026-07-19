import { z } from 'zod';
import { apiObject } from '#/core';
/** The JQL queries to be converted. */

export const JQLPersonalDataMigrationRequestSchema = apiObject({
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings: z.array(z.string()).optional(),
});

export type JQLPersonalDataMigrationRequest = z.infer<typeof JQLPersonalDataMigrationRequestSchema>;
