import { z } from 'zod';
import { ErrorCollectionSchema } from '#/models/errorCollection';
import { WarningCollectionSchema } from '#/models/warningCollection';

export const NestedResponseSchema = z.object({
  errorCollection: ErrorCollectionSchema.optional(),
  status: z.number().optional(),
  warningCollection: WarningCollectionSchema.optional(),
});

export type NestedResponse = z.infer<typeof NestedResponseSchema>;
