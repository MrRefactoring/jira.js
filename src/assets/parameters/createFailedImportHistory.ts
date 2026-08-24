import { z } from 'zod';

export const CreateFailedImportHistorySchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
  /** The executionId of the import execution */
  executionId: z.string(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateFailedImportHistory = z.input<typeof CreateFailedImportHistorySchema>;
