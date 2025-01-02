/** List of project permissions and the projects and issues those permissions grant access to. */
export interface BulkProjectPermissionGrants {
  /** A project permission, */
  permission: string;
  /** IDs of the issues the user has the permission for. */
  issues: number[];
  /** IDs of the projects the user has the permission for. */
  projects: number[];
}
