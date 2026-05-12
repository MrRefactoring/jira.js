import { z } from 'zod';
import { PermissionHolderSchema } from '#/models/permissionHolder';

/** Issue security level member. */
export const SecurityLevelMemberSchema = z.object({
  holder: PermissionHolderSchema.optional(),
  /** The ID of the issue security level member. */
  id: z.string(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.string(),
  /** The ID of the issue security scheme. */
  issueSecuritySchemeId: z.string(),
  managed: z.boolean().optional(),
});

export type SecurityLevelMember = z.infer<typeof SecurityLevelMemberSchema>;
