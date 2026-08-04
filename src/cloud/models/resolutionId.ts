import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of an issue resolution. */

export const ResolutionIdSchema = apiObject({
  /** The ID of the issue resolution. */
  id: z.string(),
});

export type ResolutionId = z.infer<typeof ResolutionIdSchema>;
