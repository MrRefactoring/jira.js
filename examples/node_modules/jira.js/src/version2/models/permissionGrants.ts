import type { PermissionGrant } from './permissionGrant';

/** List of permission grants. */
export interface PermissionGrants {
  /** Expand options that include additional permission grant details in the response. */
  expand?: string;
  /** Permission grants list. */
  permissions?: PermissionGrant[];
}
