import { z } from 'zod';

export const BulkGetUsersMigrationParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * Username of a user. To specify multiple users, pass multiple copies of this parameter. For example,
   * `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present.
   */
  username: z.array(z.string()).optional(),
  /**
   * Key of a user. To specify multiple users, pass multiple copies of this parameter. For example,
   * `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present.
   */
  key: z.array(z.string()).optional(),
});

export type BulkGetUsersMigrationParameters = z.infer<typeof BulkGetUsersMigrationParametersSchema>;
