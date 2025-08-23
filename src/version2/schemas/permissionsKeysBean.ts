import { z } from 'zod';

export const PermissionsKeysBeanSchema = z.object({
  /** A list of permission keys. */
  permissions: z.array(z.string()),
});

export type PermissionsKeysBean = z.infer<typeof PermissionsKeysBeanSchema>;
