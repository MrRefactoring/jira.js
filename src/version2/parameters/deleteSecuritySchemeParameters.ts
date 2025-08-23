import { z } from 'zod';

export const DeleteSecuritySchemeParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  schemeId: z.string(),
});

export type DeleteSecuritySchemeParameters = z.infer<typeof DeleteSecuritySchemeParametersSchema>;
