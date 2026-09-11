import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateIndexSchema = apiObject({
  entityName: z.string().optional(),
  fieldNameToColumnName: z.record(z.string(), z.string()).optional(),
  indexName: z.string().optional(),
  tableName: z.string().optional(),
  unique: z.boolean().optional(),
});

export type CreateIndex = z.infer<typeof CreateIndexSchema>;
