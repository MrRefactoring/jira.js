import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraDurationFieldSchema = apiObject({
  originalEstimateField: z.string(),
});

export type JiraDurationField = z.infer<typeof JiraDurationFieldSchema>;
