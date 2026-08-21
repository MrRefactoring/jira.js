import { z } from 'zod';

export const GenerateImportSourceTokenSchema = z.object({
  importSourceId: z.string(),
});

export type GenerateImportSourceToken = z.input<typeof GenerateImportSourceTokenSchema>;
