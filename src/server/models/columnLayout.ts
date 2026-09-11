import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ColumnLayoutItemSchema } from './columnLayoutItem';

export const ColumnLayoutSchema = apiObject({
  columnConfig: openEnum(['SYSTEM', 'EXPLICIT', 'FILTER', 'USER', 'NONE']).optional(),
  columnLayoutItems: z.array(ColumnLayoutItemSchema).optional(),
});

export type ColumnLayout = z.infer<typeof ColumnLayoutSchema>;
