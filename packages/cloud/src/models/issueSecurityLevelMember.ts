import { z } from 'zod';
import { PermissionHolderSchema } from '#/models/permissionHolder';

/** Issue security level member. */
export const IssueSecurityLevelMemberSchema = z.object({
  holder: PermissionHolderSchema.optional(),
  /** The ID of the issue security level member. */
  id: z.number(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.number(),
});

export type IssueSecurityLevelMember = z.infer<typeof IssueSecurityLevelMemberSchema>;
