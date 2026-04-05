import { z } from 'zod';

export const ToggleFeaturesSchema = z.object({
  boardId: z.number(),
  body: z
    .object({
      boardId: z.number().optional(),
      enabling: z.boolean().optional(),
      feature: z.string().optional(),
    })
    .optional(),
});

export type ToggleFeatures = z.input<typeof ToggleFeaturesSchema>;
