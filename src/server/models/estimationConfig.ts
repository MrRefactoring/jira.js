import { z } from 'zod';
import { apiObject } from '#/core';
import { EstimationFieldSchema } from './estimationField';

export const EstimationConfigSchema = apiObject({
  field: EstimationFieldSchema.optional(),
  type: z.string().optional(),
});

export type EstimationConfig = z.infer<typeof EstimationConfigSchema>;
