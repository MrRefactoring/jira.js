import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about permissions. */

export const PermissionsSchema = apiObject({
  /** List of permissions. */
  permissions: z.record(z.string(), z.any()).optional(),
});

export type Permissions = z.infer<typeof PermissionsSchema>;
