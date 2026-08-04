import { z } from 'zod';
import { apiObject } from '#/core';

export const DuplicatePlanRequestSchema = apiObject({
  /** The plan name. */
  name: z.string(),
});

export type DuplicatePlanRequest = z.infer<typeof DuplicatePlanRequestSchema>;
