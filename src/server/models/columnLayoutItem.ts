import { z } from 'zod';
import { apiObject } from '#/core';
import { NavigableFieldSchema } from './navigableField';

export const ColumnLayoutItemSchema = apiObject({
  columnHeadingKey: z.string().optional(),
  id: z.string().optional(),
  navigableField: NavigableFieldSchema.optional(),
  position: z.number().optional(),
});

export type ColumnLayoutItem = z.infer<typeof ColumnLayoutItemSchema>;
