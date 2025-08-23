import { z } from 'zod';
import { GroupLabelSchema } from './groupLabel';

/** A group found in a search. */
export const FoundGroupSchema = z.object({
  /** Avatar url for the group/team if present. */
  avatarUrl: z.string().optional(),
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId: z.string().optional(),
  /** The group name with the matched query string highlighted with the HTML bold tag. */
  html: z.string().optional(),
  labels: z.array(GroupLabelSchema).optional(),
  /**
   * Describes who/how the team is managed. The possible values are * external - when team is synced from an external
   * directory like SCIM or HRIS, and team members cannot be modified. * admins - when a team is managed by an admin
   * (team members can only be modified by admins). * team-members - managed by existing team members, new members need
   * to be invited to join. * open - anyone can join or modify this team.
   */
  managedBy: z.enum(['EXTERNAL', 'ADMINS', 'TEAM_MEMBERS', 'OPEN']).optional(),
  /** The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.` */
  name: z.string().optional(),
  /**
   * Describes the type of group. The possible values are * team-collaboration - A platform team managed in people
   * directory. * userbase-group - a group of users created in adminhub. * admin-oversight - currently unused.
   */
  usageType: z.enum(['USERBASE_GROUP', 'TEAM_COLLABORATION', 'ADMIN_OVERSIGHT']).optional(),
});

export type FoundGroup = z.infer<typeof FoundGroupSchema>;
