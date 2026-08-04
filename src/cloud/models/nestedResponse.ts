import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorCollectionSchema } from './errorCollection';
import { WarningCollectionSchema } from './warningCollection';

export const NestedResponseSchema = apiObject({
  errorCollection: ErrorCollectionSchema.optional(),
  status: z.number().optional(),
  warningCollection: WarningCollectionSchema.optional(),
});

export type NestedResponse = z.infer<typeof NestedResponseSchema>;
