import { z } from 'zod';
import { apiObject } from '#/core';
import { MultidirectoryInviteRoleAssociationSchema } from './multidirectoryInviteRoleAssociation';

export const MultidirectoryInviteApiRequestSchema = apiObject({
  /** Email addresses of the people you want to invite. */
  emails: z.array(z.string()),
  /** The access you want to give users from this invitation. */
  permissionRules: z.array(MultidirectoryInviteRoleAssociationSchema).optional(),
  /**
   * The groups you want to add users to from this invitation. Use the [Get groups in an
   * organization](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-groups/#api-v2-orgs-orgid-directories-directoryid-groups-get)
   * endpoint to find the group IDs.
   */
  additionalGroups: z.array(z.string()).optional(),
  /** Set to true if you want to send an email invitation. */
  sendNotification: z.boolean().optional(),
  /** Add a message to your email invitation. */
  notificationText: z.string().optional(),
});

export type MultidirectoryInviteApiRequest = z.infer<typeof MultidirectoryInviteApiRequestSchema>;
