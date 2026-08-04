import { z } from 'zod';
import { apiObject } from '#/core';

export const GetCrossProjectReleaseResponseSchema = apiObject({
  /** The cross-project release name. */
  name: z.string().optional(),
  /** The IDs of the releases included in the cross-project release. */
  releaseIds: z.array(z.number()).optional(),
});

export type GetCrossProjectReleaseResponse = z.infer<typeof GetCrossProjectReleaseResponseSchema>;
