import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomFieldReplacementSchema = apiObject({
  customFieldId: z.number().optional(),
  moveTo: z.number().optional(),
});

export type CustomFieldReplacement = z.infer<typeof CustomFieldReplacementSchema>;
