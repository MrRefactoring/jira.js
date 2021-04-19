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
  /** The project that the filter is shared with. This is similar to the project object returned by [Get project](#api-rest-api-3-project-projectIdOrKey-get) but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`.
   For a request, specify the `id` for the project. */
  project?: Project[];
  /** The project role that the filter is shared with.
   For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in. */
  role?: ProjectRole[];
  /** The group that the filter is shared with. For a request, specify the `name` property for the group. */
  group?: GroupName[];
}
