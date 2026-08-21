import { z } from 'zod';

export const StartImportSchema = z.object({
  /** The id of the import configuration that should be started */
  id: z.string(),
});

export type StartImport = z.input<typeof StartImportSchema>;
