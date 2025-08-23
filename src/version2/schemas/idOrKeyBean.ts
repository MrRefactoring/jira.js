import { z } from 'zod';

export const IdOrKeyBeanSchema = z.object({
  /** The ID of the referenced item. */
  id: z.number().int().optional(),
  /** The key of the referenced item. */
  key: z.string().optional(),
});

export type IdOrKeyBean = z.infer<typeof IdOrKeyBeanSchema>;
