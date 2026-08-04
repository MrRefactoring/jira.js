import { z } from 'zod';
import { apiObject } from '#/core';

export const EstimationConfigSchema = apiObject({
  field: apiObject({
    displayName: z.string().optional(),
    fieldId: z.string().optional(),
  }).optional(),
  type: z.string().optional(),
});

export type EstimationConfig = z.infer<typeof EstimationConfigSchema>;
