import { z } from 'zod';

export const RemoveLevelParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  schemeId: z.string(),
  /** The ID of the issue security level to remove. */
  levelId: z.string(),
  /** The ID of the issue security level that will replace the currently selected level. */
  replaceWith: z.string().optional(),
});

export type RemoveLevelParameters = z.infer<typeof RemoveLevelParametersSchema>;
