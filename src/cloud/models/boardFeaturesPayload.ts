import { z } from 'zod';
import { apiObject } from '#/core';
/** Configuration of features for one or more boards. Replaces the deprecated features field on BoardPayload */

export const BoardFeaturesPayloadSchema = apiObject({
  /** A map of board PCRIs to the list of features to enable on each board. */
  boardFeatures: z.record(z.string(), z.any()).optional(),
});

export type BoardFeaturesPayload = z.infer<typeof BoardFeaturesPayloadSchema>;
