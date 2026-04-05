import { z } from 'zod';

/** The ID of the issue security scheme. */
export const SecuritySchemeIdSchema = z.object({
  /** The ID of the issue security scheme. */
  id: z.string(),
});

export type SecuritySchemeId = z.infer<typeof SecuritySchemeIdSchema>;
