import { z } from 'zod';
import { ErrorCollectionSchema } from './errorCollection';
import { WarningCollectionSchema } from './warningCollection';

export const NestedResponseSchema = z.object({
  errorCollection: ErrorCollectionSchema.optional(),
  status: z.number().int().optional(),
  warningCollection: WarningCollectionSchema.optional(),
});

export type NestedResponse = z.infer<typeof NestedResponseSchema>;
