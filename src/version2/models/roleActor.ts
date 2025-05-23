import type { ProjectRoleGroup } from './projectRoleGroup';
import type { ProjectRoleUser } from './projectRoleUser';

/** Details about a user assigned to a project role. */
export interface RoleActor {
  actorGroup?: ProjectRoleGroup;
  actorUser?: ProjectRoleUser;
  /** The avatar of the role actor. */
  avatarUrl?: string;
  /**
   * The display name of the role actor. For users, depending on the user’s privacy setting, this may return an
   * alternative value for the user's name.
   */
  displayName?: string;
  /** The ID of the role actor. */
  id?: number;
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /** The type of role actor. */
  type?: string;
}
