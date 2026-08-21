import { z } from 'zod';

export const GetImportSourceSchema = z.object({
  /** The unique identifier of the import source */
  id: z.string(),
});

export type GetImportSource = z.input<typeof GetImportSourceSchema>;
