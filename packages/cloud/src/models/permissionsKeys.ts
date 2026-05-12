import { z } from 'zod';

export const PermissionsKeysSchema = z.object({
  /** A list of permission keys. */
  permissions: z.array(z.string()),
});

export type PermissionsKeys = z.infer<typeof PermissionsKeysSchema>;
