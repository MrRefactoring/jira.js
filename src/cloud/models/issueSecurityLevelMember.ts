import { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { PermissionHolderSchema } from './permissionHolder';

/** Issue security level member. */
export const IssueSecurityLevelMemberSchema = apiObject({
  holder: requiredInResponse(PermissionHolderSchema),
  /** The ID of the issue security level member. */
  id: z.number(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.number(),
});

export type IssueSecurityLevelMember = z.infer<typeof IssueSecurityLevelMemberSchema>;
