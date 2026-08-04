import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionHolderSchema } from './permissionHolder';
/** Issue security level member. */

export const IssueSecurityLevelMemberSchema = apiObject({
  holder: PermissionHolderSchema.optional(),
  /** The ID of the issue security level member. */
  id: z.number(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.number(),
});

export type IssueSecurityLevelMember = z.infer<typeof IssueSecurityLevelMemberSchema>;
