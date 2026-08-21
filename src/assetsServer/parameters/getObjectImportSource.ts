import { z } from 'zod';

export const GetObjectImportSourceSchema = z.object({
  id: z.number(),
});

export type GetObjectImportSource = z.input<typeof GetObjectImportSourceSchema>;
