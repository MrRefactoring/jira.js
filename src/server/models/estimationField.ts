import { z } from 'zod';
import { apiObject } from '#/core';

export const EstimationFieldSchema = apiObject({
  displayName: z.string().optional(),
  fieldId: z.string().optional(),
});

export type EstimationField = z.infer<typeof EstimationFieldSchema>;
