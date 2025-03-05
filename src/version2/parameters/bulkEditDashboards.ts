import type { BulkChangeOwnerDetails, PermissionDetails } from '../models';

/** Details of a request to bulk edit shareable entity. */
export interface BulkEditDashboards {
  /** Allowed action for bulk edit shareable entity */
  action: string;
  changeOwnerDetails?: BulkChangeOwnerDetails;
  /** The id list of shareable entities to be changed. */
  entityIds: number[];
  /** Whether the actions are executed by users with Administer Jira global permission. */
  extendAdminPermissions?: boolean;
  permissionDetails?: PermissionDetails;
}
