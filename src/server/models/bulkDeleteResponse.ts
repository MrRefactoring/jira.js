import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkDeleteResponseSchema = apiObject({
  deletedCustomFields: z.array(z.string()).optional(),
  message: z.string().optional(),
  notDeletedCustomFields: z.record(z.string(), z.any()).optional(),
});

export type BulkDeleteResponse = z.infer<typeof BulkDeleteResponseSchema>;
