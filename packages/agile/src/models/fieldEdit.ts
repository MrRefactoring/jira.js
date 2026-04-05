import { z } from 'zod';

export const FieldEditSchema = z.object({
  value: z.string().optional(),
});

export type FieldEdit = z.infer<typeof FieldEditSchema>;
