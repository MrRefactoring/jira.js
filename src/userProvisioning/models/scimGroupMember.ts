import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM group member */

export const ScimGroupMemberSchema = apiObject({
  type: z.string().optional(),
  value: z.string().optional(),
  display: z.string().optional(),
  $ref: z.string().optional(),
});

export type ScimGroupMember = z.infer<typeof ScimGroupMemberSchema>;
