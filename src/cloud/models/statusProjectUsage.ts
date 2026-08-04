import { z } from 'zod';
import { apiObject } from '#/core';
/** The project. */

export const StatusProjectUsageSchema = apiObject({
  /** The project ID. */
  id: z.string().optional(),
});

export type StatusProjectUsage = z.infer<typeof StatusProjectUsageSchema>;
