import type { GroupName } from './groupName';

/** Details of an application role. */
export interface ApplicationRole {
  /**
   * The groups that are granted default access for this application role. As a group's name can change, use of
   * `defaultGroupsDetails` is recommended to identify a groups.
   */
  defaultGroups?: string[];
  /** The groups that are granted default access for this application role. */
  defaultGroupsDetails?: GroupName[];
  /** The groups associated with the application role. */
  groupDetails?: GroupName[];
  /**
   * The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended
   * to identify a groups.
   */
  groups?: string[];
  hasUnlimitedSeats?: boolean;
  /** The key of the application role. */
  key?: string;
  /** The display name of the application role. */
  name?: string;
  /** The maximum count of users on your license. */
  numberOfSeats?: number;
  /** Indicates if the application role belongs to Jira platform (`jira-core`). */
  platform?: boolean;
  /** The count of users remaining on your license. */
  remainingSeats?: number;
  /** Determines whether this application role should be selected by default on user creation. */
  selectedByDefault?: boolean;
  /** The number of users counting against your license. */
  userCount?: number;
  /** The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license. */
  userCountDescription?: string;
}
