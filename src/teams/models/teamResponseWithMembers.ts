import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { TeamExternalReferenceSchema } from './teamExternalReference';
import { MembershipSchema } from './membership';
import { UserPermissionsSchema } from './userPermissions';

export const TeamResponseWithMembersSchema = apiObject({
  creatorId: z.string().nullish(),
  description: z.string(),
  displayName: z.string(),
  externalReference: TeamExternalReferenceSchema.nullish(),
  members: z.array(MembershipSchema),
  organizationId: z.string(),
  state: openEnum(['ACTIVE', 'ARCHIVED']),
  teamId: z.string(),
  teamType: openEnum(['OPEN', 'MEMBER_INVITE', 'EXTERNAL', 'ORG_ADMIN_MANAGED']),
  userPermissions: UserPermissionsSchema,
});

export type TeamResponseWithMembers = z.infer<typeof TeamResponseWithMembersSchema>;
