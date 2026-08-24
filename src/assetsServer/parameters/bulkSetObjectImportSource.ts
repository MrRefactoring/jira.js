import { z } from 'zod';

export const BulkSetObjectImportSourceSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type BulkSetObjectImportSource = z.input<typeof BulkSetObjectImportSourceSchema>;
