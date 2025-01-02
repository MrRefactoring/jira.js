/** Details of project permissions and associated issues and projects to look up. */
export interface BulkProjectPermissions {
  /** List of issue IDs. */
  issues?: number[];
  /** List of project permissions. */
  permissions: string[];
  /** List of project IDs. */
  projects?: number[];
}
