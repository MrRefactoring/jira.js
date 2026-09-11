import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorCollectionSchema = apiObject({
  errorMessages: z.array(z.string()).optional(),
  errors: z.record(z.string(), z.any()).optional(),
});

export type ErrorCollection = z.infer<typeof ErrorCollectionSchema>;
