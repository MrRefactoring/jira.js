import { z } from 'zod';
import { apiObject } from '#/core';
/** The mapping of old to new status ID. */

export const StatusMigrationSchema = apiObject({
  /** The new status ID. */
  newStatusReference: z.string(),
  /** The old status ID. */
  oldStatusReference: z.string(),
});

export type StatusMigration = z.infer<typeof StatusMigrationSchema>;
