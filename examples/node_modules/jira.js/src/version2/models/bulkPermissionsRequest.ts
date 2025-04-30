import type { BulkProjectPermissions } from './bulkProjectPermissions';

/** Details of global permissions to look up and project permissions with associated projects and issues to look up. */
export interface BulkPermissionsRequest {
  /** The account ID of a user. */
  accountId?: string;
  /** Global permissions to look up. */
  globalPermissions?: string[];
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions?: BulkProjectPermissions[];
}
