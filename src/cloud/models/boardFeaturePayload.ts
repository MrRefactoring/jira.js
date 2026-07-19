import { z } from 'zod';
import { apiObject } from '#/core';
/** The payload for setting a board feature */

export const BoardFeaturePayloadSchema = apiObject({
  /** The key of the feature */
  featureKey: z.enum(['ESTIMATION', 'SPRINTS']).optional(),
  /** Whether the feature should be turned on or off */
  state: z.enum(['true', 'false']).optional(),
});

export type BoardFeaturePayload = z.infer<typeof BoardFeaturePayloadSchema>;
