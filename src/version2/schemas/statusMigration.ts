import { z } from 'zod';

/** The mapping of old to new status ID. */
export const StatusMigrationSchema = z.object({
  /** The new status ID. */
  newStatusReference: z.string(),
  /** The old status ID. */
  oldStatusReference: z.string(),
});

export type StatusMigration = z.infer<typeof StatusMigrationSchema>;
