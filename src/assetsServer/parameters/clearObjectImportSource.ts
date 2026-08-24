import { z } from 'zod';

export const ClearObjectImportSourceSchema = z.object({
  previousName: z.string().optional(),
  id: z.string(),
});

export type ClearObjectImportSource = z.input<typeof ClearObjectImportSourceSchema>;
