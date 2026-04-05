import { z } from 'zod';

export const RichTextSchema = z.object({
  empty: z.boolean().optional(),
  emptyAdf: z.boolean().optional(),
  finalised: z.boolean().optional(),
  valueSet: z.boolean().optional(),
});

export type RichText = z.infer<typeof RichTextSchema>;
