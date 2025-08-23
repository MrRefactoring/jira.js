import { z } from 'zod';

/** Details about permissions. */
export const PermissionsSchema = z.object({
  /** List of permissions. */
  permissions: z.object({}).optional(),
});

export type Permissions = z.infer<typeof PermissionsSchema>;
