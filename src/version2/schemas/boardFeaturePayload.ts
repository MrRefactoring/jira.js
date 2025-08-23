import { z } from 'zod';

/** The payload for setting a board feature */
export const BoardFeaturePayloadSchema = z.object({
  /** The key of the feature */
  featureKey: z.enum(['ESTIMATION', 'SPRINTS']).optional(),
  /** Whether the feature should be turned on or off */
  state: z.boolean().optional(),
});

export type BoardFeaturePayload = z.infer<typeof BoardFeaturePayloadSchema>;
