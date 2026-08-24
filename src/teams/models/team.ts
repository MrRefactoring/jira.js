import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { TeamExternalReferenceSchema } from './teamExternalReference';

export const TeamSchema = apiObject({
  creatorId: z.string().nullish(),
  description: z.string(),
  displayName: z.string(),
  externalReference: TeamExternalReferenceSchema.nullish(),
  organizationId: z.string(),
  state: openEnum(['ACTIVE', 'ARCHIVED']),
  teamId: z.string(),
  teamType: openEnum(['OPEN', 'MEMBER_INVITE', 'EXTERNAL', 'ORG_ADMIN_MANAGED']),
});

export type Team = z.infer<typeof TeamSchema>;
