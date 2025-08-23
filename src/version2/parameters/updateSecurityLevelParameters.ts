import { z } from 'zod';

export const UpdateSecurityLevelParametersSchema = z.object({
  /** The ID of the issue security scheme level belongs to. */
  schemeId: z.string(),
  /** The ID of the issue security level to update. */
  levelId: z.string(),
  /** The description of the issue security scheme level. */
  description: z.string().optional(),
  /** The name of the issue security scheme level. Must be unique. */
  name: z.string().optional(),
});

export type UpdateSecurityLevelParameters = z.infer<typeof UpdateSecurityLevelParametersSchema>;
