import { BulkChangeOwnerDetails } from './bulkChangeOwnerDetails';
import { PermissionDetails } from './permissionDetails';

/** Details of a request to bulk edit shareable entity. */
export interface BulkEditShareableEntityRequest {
  /** Allowed action for bulk edit shareable entity */
  action: 'changeOwner' | 'changePermission' | 'addPermission' | 'removePermission' | string;
  changeOwnerDetails?: BulkChangeOwnerDetails;
  /** The id list of shareable entities to be changed. */
  entityIds: number[];
  /** Whether the actions are executed by users with Administer Jira global permission. */
  extendAdminPermissions?: boolean;
  permissionDetails?: PermissionDetails;
}
