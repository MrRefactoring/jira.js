import { BulkProjectPermissionGrants } from './bulkProjectPermissionGrants';

/** Details of global and project permissions granted to the user. */
export interface BulkPermissionGrants {
  /** List of project permissions and the projects and issues those permissions provide access to. */
  projectPermissions: BulkProjectPermissionGrants[];
  /** List of permissions granted to the user. */
  globalPermissions: string[];
}
