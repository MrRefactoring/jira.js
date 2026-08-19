import { z } from 'zod';
import { apiObject } from '#/core';
import { FeatureSchema } from './feature';

export const GetFeaturesForBoardSchema = apiObject({
  features: z.array(FeatureSchema).optional(),
});

export type GetFeaturesForBoard = z.infer<typeof GetFeaturesForBoardSchema>;
