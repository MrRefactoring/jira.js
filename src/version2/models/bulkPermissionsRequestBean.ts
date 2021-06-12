import { BulkProjectPermissions } from './bulkProjectPermissions';

/** Details of global permissions to look up and project permissions with associated projects and issues to look up. */
export interface BulkPermissionsRequestBean {
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions?: BulkProjectPermissions[];
  /** Global permissions to look up. */
  globalPermissions?: string[];
  /** The account ID of a user. */
  accountId?: string;
}
