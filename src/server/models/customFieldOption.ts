import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomFieldOptionSchema = apiObject({
  childrenIds: z.array(z.number()).optional(),
  disabled: z.boolean().optional(),
  id: z.number().optional(),
  self: z.url().optional(),
  value: z.string().optional(),
});

export type CustomFieldOption = z.infer<typeof CustomFieldOptionSchema>;
