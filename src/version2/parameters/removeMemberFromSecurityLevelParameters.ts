import { z } from 'zod';

export const RemoveMemberFromSecurityLevelParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  schemeId: z.string(),
  /** The ID of the issue security level. */
  levelId: z.string(),
  /** The ID of the issue security level member to be removed. */
  memberId: z.string(),
});

export type RemoveMemberFromSecurityLevelParameters = z.infer<typeof RemoveMemberFromSecurityLevelParametersSchema>;
