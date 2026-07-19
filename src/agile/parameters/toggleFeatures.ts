import { z } from 'zod';

export const ToggleFeaturesSchema = z.object({
  boardId: z.number(),
  body: z.record(z.string(), z.any()),
});

export type ToggleFeatures = z.input<typeof ToggleFeaturesSchema>;
