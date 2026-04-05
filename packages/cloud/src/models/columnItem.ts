import { z } from 'zod';

/** Details of an issue navigator column item. */
export const ColumnItemSchema = z.object({
  /** The issue navigator column label. */
  label: z.string().optional(),
  /** The issue navigator column value. */
  value: z.string().optional(),
});

export type ColumnItem = z.infer<typeof ColumnItemSchema>;
