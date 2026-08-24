import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectAttributeValueInSchema = apiObject({
  value: z.string(),
});

export type ObjectAttributeValueIn = z.infer<typeof ObjectAttributeValueInSchema>;
