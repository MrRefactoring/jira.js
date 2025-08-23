import { z } from 'zod';
import { SecuritySchemeLevelMemberBeanSchema } from './securitySchemeLevelMemberBean';

export const SecuritySchemeLevelSchema = z.object({
  /** The description of the issue security scheme level. */
  description: z.string().optional(),
  /** Specifies whether the level is the default level. False by default. */
  isDefault: z.boolean().optional(),
  /** The list of level members which should be added to the issue security scheme level. */
  members: z.array(SecuritySchemeLevelMemberBeanSchema).optional(),
  /** The name of the issue security scheme level. Must be unique. */
  name: z.string(),
});

export type SecuritySchemeLevel = z.infer<typeof SecuritySchemeLevelSchema>;
