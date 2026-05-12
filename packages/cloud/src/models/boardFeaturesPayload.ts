import { z } from 'zod';

/** Configuration of features for one or more boards. Replaces the deprecated features field on BoardPayload */
export const BoardFeaturesPayloadSchema = z.object({
  /** A map of board PCRIs to the list of features to enable on each board. */
  boardFeatures: z.record(z.string(), z.any()).optional(),
});

export type BoardFeaturesPayload = z.infer<typeof BoardFeaturesPayloadSchema>;
