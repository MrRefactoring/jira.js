import { z } from 'zod';
import { apiObject } from '#/core';
/** The project. */

export const ProjectUsageSchema = apiObject({
  /** The project ID. */
  id: z.string().optional(),
});

export type ProjectUsage = z.infer<typeof ProjectUsageSchema>;
