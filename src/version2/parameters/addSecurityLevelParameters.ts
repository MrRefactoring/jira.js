import { z } from 'zod';
import { SecuritySchemeLevelSchema } from './securitySchemeLevel';

export const AddSecurityLevelParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  schemeId: z.string(),
  /** The list of scheme levels which should be added to the security scheme. */
  levels: z.array(SecuritySchemeLevelSchema).optional(),
});

export type AddSecurityLevelParameters = z.infer<typeof AddSecurityLevelParametersSchema>;
