import { Scope } from './scope';
import { PermissionGrant } from './permissionGrant';

/** Details of a permission scheme. */
export interface PermissionScheme {
  /** The expand options available for the permission scheme. */
  expand?: string;
  /** The ID of the permission scheme. */
  id?: number;
  /** The URL of the permission scheme. */
  self?: string;
  /** The name of the permission scheme. Must be unique. */
  name: string;
  /** A description for the permission scheme. */
  description?: string;
  scope?: Scope;
  /**
   * The permission scheme to create or update. See [About permission schemes and
   * grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.
   */
  permissions?: PermissionGrant[];
}
