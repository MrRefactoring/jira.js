import { BulkProjectPermissions } from './bulkProjectPermissions';

/** @deprecated Use BulkPermissionsRequest instead. */
export type BulkPermissionsRequestBean = BulkPermissionsRequest;

/** Details of global permissions to look up and project permissions with associated projects and issues to look up. */
export interface BulkPermissionsRequest {
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions?: BulkProjectPermissions[];
  /** Global permissions to look up. */
  globalPermissions?: string[];
  /** The account ID of a user. */
  accountId?: string;
}
