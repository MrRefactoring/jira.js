import { z } from 'zod';
import { SecuritySchemeLevelMemberBeanSchema } from './securitySchemeLevelMemberBean';

/** Details of issue security scheme level new members. */
export const SecuritySchemeMembersRequestSchema = z.object({
  /** The list of level members which should be added to the issue security scheme level. */
  members: z.array(SecuritySchemeLevelMemberBeanSchema).optional(),
});

export type SecuritySchemeMembersRequest = z.infer<typeof SecuritySchemeMembersRequestSchema>;
