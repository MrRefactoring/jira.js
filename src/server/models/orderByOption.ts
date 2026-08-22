import { z } from 'zod';
import { apiObject } from '#/core';

export const OrderByOptionSchema = apiObject({
  fieldId: z.string().optional(),
  fieldName: z.string().optional(),
  sortJql: z.string().optional(),
});

export type OrderByOption = z.infer<typeof OrderByOptionSchema>;
