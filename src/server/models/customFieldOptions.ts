import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldOptionSchema } from './customFieldOption';

export const CustomFieldOptionsSchema = apiObject({
  options: z.array(CustomFieldOptionSchema).optional(),
  total: z.number().optional(),
});

export type CustomFieldOptions = z.infer<typeof CustomFieldOptionsSchema>;
