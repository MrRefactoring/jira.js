import { z } from 'zod';
import { SecuritySchemeLevelMemberSchema } from '#/models/securitySchemeLevelMember';

export const SecuritySchemeLevelSchema = z.object({
  /** The description of the issue security scheme level. */
  description: z.string().max(4000, 'description must be at most 4000 characters').optional(),
  /** Specifies whether the level is the default level. False by default. */
  isDefault: z.boolean().optional(),
  /** The list of level members which should be added to the issue security scheme level. */
  members: z.array(SecuritySchemeLevelMemberSchema).optional(),
  /** The name of the issue security scheme level. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters'),
});

export type SecuritySchemeLevel = z.infer<typeof SecuritySchemeLevelSchema>;
