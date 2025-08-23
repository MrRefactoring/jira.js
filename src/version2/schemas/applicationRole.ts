import { z } from 'zod';
import { GroupNameSchema } from './groupName';

/** Details of an application role. */
export const ApplicationRoleSchema = z.object({
  /**
   * The groups that are granted default access for this application role. As a group's name can change, use of
   * `defaultGroupsDetails` is recommended to identify a groups.
   */
  defaultGroups: z.array(z.string()).optional(),
  /** The groups that are granted default access for this application role. */
  defaultGroupsDetails: z.array(GroupNameSchema).optional(),
  /** Deprecated. */
  defined: z.boolean().optional(),
  /** The groups associated with the application role. */
  groupDetails: z.array(GroupNameSchema).optional(),
  /**
   * The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended
   * to identify a groups.
   */
  groups: z.array(z.string()).optional(),
  hasUnlimitedSeats: z.boolean().optional(),
  /** The key of the application role. */
  key: z.string().optional(),
  /** The display name of the application role. */
  name: z.string().optional(),
  /** The maximum count of users on your license. */
  numberOfSeats: z.number().int().optional(),
  /** Indicates if the application role belongs to Jira platform (`jira-core`). */
  platform: z.boolean().optional(),
  /** The count of users remaining on your license. */
  remainingSeats: z.number().int().optional(),
  /** Determines whether this application role should be selected by default on user creation. */
  selectedByDefault: z.boolean().optional(),
  /** The number of users counting against your license. */
  userCount: z.number().int().optional(),
  /** The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license. */
  userCountDescription: z.string().optional(),
});

export type ApplicationRole = z.infer<typeof ApplicationRoleSchema>;
