import { z } from 'zod';
import { SecuritySchemeLevelMemberBeanSchema } from './securitySchemeLevelMemberBean';

export const AddSecurityLevelMembersParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  schemeId: z.string(),
  /** The ID of the issue security level. */
  levelId: z.string(),
  /** The list of level members which should be added to the issue security scheme level. */
  members: z.array(SecuritySchemeLevelMemberBeanSchema).optional(),
});

export type AddSecurityLevelMembersParameters = z.infer<typeof AddSecurityLevelMembersParametersSchema>;
