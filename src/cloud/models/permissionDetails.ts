import { z } from 'zod';
import { apiObject } from '#/core';
import { SharePermissionSchema } from './sharePermission';
/** Details for permissions of shareable entities */

export const PermissionDetailsSchema = apiObject({
  /** The edit permissions for the shareable entities. */
  editPermissions: z.array(SharePermissionSchema),
  /** The share permissions for the shareable entities. */
  sharePermissions: z.array(SharePermissionSchema),
});

export type PermissionDetails = z.infer<typeof PermissionDetailsSchema>;
