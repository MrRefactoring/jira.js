import { z } from 'zod';

export const GetImportProgressSchema = z.object({
  /** The id of the import source configuration that the progress should be fetched for */
  id: z.string(),
});

export type GetImportProgress = z.input<typeof GetImportProgressSchema>;
