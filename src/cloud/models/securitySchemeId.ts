import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of the issue security scheme. */

export const SecuritySchemeIdSchema = apiObject({
  /** The ID of the issue security scheme. */
  id: z.string(),
});

export type SecuritySchemeId = z.infer<typeof SecuritySchemeIdSchema>;
