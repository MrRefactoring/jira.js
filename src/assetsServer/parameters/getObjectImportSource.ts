import { z } from 'zod';

export const GetObjectImportSourceSchema = z.object({
  id: z.string(),
});

export type GetObjectImportSource = z.input<typeof GetObjectImportSourceSchema>;
