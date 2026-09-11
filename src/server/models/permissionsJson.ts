import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionJsonSchema } from './permissionJson';

export const PermissionsJsonSchema = apiObject({
  /** A map of permission keys to permission objects. */
  permissions: z.record(z.string(), PermissionJsonSchema).optional(),
});

export type PermissionsJson = z.infer<typeof PermissionsJsonSchema>;
