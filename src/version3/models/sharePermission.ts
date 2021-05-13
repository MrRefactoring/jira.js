import { Project } from './project';
import { ProjectRole } from './projectRole';
import { GroupName } from './groupName';

/**
 * Details of a share permission for the filter. */
export interface SharePermission {
  /** The unique identifier of the share permission. */
  id?: number;
  /** The type of share permission:

   *  `group` Shared with a group. If set in a request, then specify `sharePermission.group` as well.
   *  `project` Shared with a project. If set in a request, then specify `sharePermission.project` as well.
   *  `projectRole` Share with a project role in a project. This value is not returned in responses. It is used in requests, where it needs to be specify with `projectId` and `projectRoleId`.
   *  `global` Shared globally. If set in a request, no other `sharePermission` properties need to be specified.
   *  `loggedin` Shared with all logged-in users. Note: This value is set in a request by specifying `authenticated` as the `type`.
   *  `project-unknown` Shared with a project that the user does not have access to. Cannot be set in a request. */
  type: string;
  project?: Project;
  role?: ProjectRole;
  group?: GroupName;
}
