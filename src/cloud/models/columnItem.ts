import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an issue navigator column item. */

export const ColumnItemSchema = apiObject({
  /** The issue navigator column label. */
  label: z.string().optional(),
  /** The issue navigator column value. */
  value: z.string().optional(),
});

export type ColumnItem = z.infer<typeof ColumnItemSchema>;
