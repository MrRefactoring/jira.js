export interface SharePermissionInputBean {
  /**
   * The type of the share permission.Specify the type as follows:
   *
   * `group` Share with a group. Specify `groupname` as well. `project` Share with a project. Specify `projectId` as
   * well. `projectRole` Share with a project role in a project. Specify `projectId` and `projectRoleId` as well.
   * `global` Share globally, including anonymous users. If set, this type overrides all existing share permissions and
   * must be deleted before any non-global share permissions is set. `authenticated` Share with all logged-in users.
   * This shows as `loggedin` in the response. If set, this type overrides all existing share permissions and must be
   * deleted before any non-global share permissions is set.
   */
  type: string;
  /** The ID of the project to share the filter with. Set `type` to `project`. */
  projectId?: string;
  /** The name of the group to share the filter with. Set `type` to `group`. */
  groupname?: string;
  /**
   * The ID of the project role to share the filter with. Set `type` to `projectRole` and the `projectId` for the
   * project that the role is in.
   */
  projectRoleId?: string;
}
