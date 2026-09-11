import { z } from 'zod';
import { apiObject } from '#/core';
import { ColumnSchema } from './column';

export const ColumnConfigSchema = apiObject({
  columns: z.array(ColumnSchema).optional(),
  constraintType: z.string().optional(),
});

export type ColumnConfig = z.infer<typeof ColumnConfigSchema>;
