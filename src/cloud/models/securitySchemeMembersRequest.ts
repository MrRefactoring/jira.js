import { z } from 'zod';
import { apiObject } from '#/core';
import { SecuritySchemeLevelMemberSchema } from './securitySchemeLevelMember';
/** Details of issue security scheme level new members. */

export const SecuritySchemeMembersRequestSchema = apiObject({
  /** The list of level members which should be added to the issue security scheme level. */
  members: z.array(SecuritySchemeLevelMemberSchema).optional(),
});

export type SecuritySchemeMembersRequest = z.infer<typeof SecuritySchemeMembersRequestSchema>;
