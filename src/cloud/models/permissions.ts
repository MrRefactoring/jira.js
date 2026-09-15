import { z } from 'zod';
import { apiObject } from '#/core';
import { UserPermissionSchema } from './userPermission';

/** Details about permissions. */
export const PermissionsSchema = apiObject({
  /** List of permissions. */
  permissions: z.record(z.string(), UserPermissionSchema).optional(),
});

export type Permissions = z.infer<typeof PermissionsSchema>;
