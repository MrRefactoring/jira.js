import { z } from 'zod';
import { PermissionGrantSchema } from './permissionGrant';

/** List of permission grants. */
export const PermissionGrantsSchema = z.object({
  /** Expand options that include additional permission grant details in the response. */
  expand: z.string().optional(),
  /** Permission grants list. */
  permissions: z.array(PermissionGrantSchema).optional(),
});

export type PermissionGrants = z.infer<typeof PermissionGrantsSchema>;
