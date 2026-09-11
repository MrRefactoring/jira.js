import { z } from 'zod';
import { apiObject } from '#/core';

export const UnmapSprintsSchema = apiObject({
  sprintIds: z.array(z.number()).optional(),
});

export type UnmapSprints = z.infer<typeof UnmapSprintsSchema>;
