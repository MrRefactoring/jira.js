import { PermissionGrant } from './permissionGrant';

/**
 * List of permission grants. */
export interface PermissionGrants {
  /** Permission grants list. */
  permissions?: PermissionGrant[];
  /** Expand options that include additional permission grant details in the response. */
  expand?: string;
}
