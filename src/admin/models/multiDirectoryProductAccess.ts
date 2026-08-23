import { z } from 'zod';
import { apiObject } from '#/core';
/** Last active timestamps for the user by product. */

export const MultiDirectoryProductAccessSchema = apiObject({
  /** The product key (e.g. `jira`, `confluence`). */
  key: z.string().optional(),
  /** The unique ID of the Product instance. */
  id: z.string().optional(),
  /** ISO-8601 timestamp of the user's last activity in the given product and site. */
  lastActiveTimestamp: z.coerce.date().optional(),
});

export type MultiDirectoryProductAccess = z.infer<typeof MultiDirectoryProductAccessSchema>;
