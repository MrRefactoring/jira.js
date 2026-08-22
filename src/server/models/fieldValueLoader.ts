import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldValueLoaderSchema = apiObject({
  comparator: z.record(z.string(), z.any()).optional(),
});

export type FieldValueLoader = z.infer<typeof FieldValueLoaderSchema>;
