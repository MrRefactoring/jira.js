import { z } from 'zod';
import { apiObject } from '#/core';
/** Project ID details. */

export const ProjectIdSchema = apiObject({
  /** The ID of the project. */
  id: z.string(),
});

export type ProjectId = z.infer<typeof ProjectIdSchema>;
