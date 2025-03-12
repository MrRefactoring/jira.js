import type { PermissionGrant } from './permissionGrant';
import type { Scope } from './scope';

/** Details of a permission scheme. */
export interface PermissionScheme {
  /** A description for the permission scheme. */
  description?: string;
  /** The expand options available for the permission scheme. */
  expand?: string;
  /** The ID of the permission scheme. */
  id?: number;
  /** The name of the permission scheme. Must be unique. */
  name: string;
  /**
   * The permission scheme to create or update. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.
   */
  permissions?: PermissionGrant[];
  scope?: Scope;
  /** The URL of the permission scheme. */
  self?: string;
}
