import type { SharePermission } from './sharePermission';

/** Details for permissions of shareable entities */
export interface PermissionDetails {
  /** The edit permissions for the shareable entities. */
  editPermissions: SharePermission[];
  /** The share permissions for the shareable entities. */
  sharePermissions: SharePermission[];
}
