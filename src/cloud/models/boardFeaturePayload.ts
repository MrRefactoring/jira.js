import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

/** The payload for setting a board feature */
export const BoardFeaturePayloadSchema = apiObject({
  /** The key of the feature */
  featureKey: openEnum(['ESTIMATION', 'SPRINTS']).optional(),
  /** Whether the feature should be turned on or off */
  state: z.boolean().optional(),
});

export type BoardFeaturePayload = z.infer<typeof BoardFeaturePayloadSchema>;
