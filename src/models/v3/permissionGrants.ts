import { PermissionGrant } from './permissionGrant';

export interface PermissionGrants {
  permissions: PermissionGrant[];
  expand: string;
}
