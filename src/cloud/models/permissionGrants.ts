import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionGrantSchema } from './permissionGrant';
/** List of permission grants. */

export const PermissionGrantsSchema = apiObject({
  /** Expand options that include additional permission grant details in the response. */
  expand: z.string().optional(),
  /** Permission grants list. */
  permissions: z.array(PermissionGrantSchema).optional(),
});

export type PermissionGrants = z.infer<typeof PermissionGrantsSchema>;
