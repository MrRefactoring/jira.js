import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectFilterValuesSchema = apiObject({
  objectTypeAttributeId: z.number().optional(),
  selectedValues: z.array(z.string()).optional(),
  filterByObjectType: z.boolean().optional(),
});

export type ObjectFilterValues = z.infer<typeof ObjectFilterValuesSchema>;
