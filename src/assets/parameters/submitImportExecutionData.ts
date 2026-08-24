import { z } from 'zod';

export const SubmitImportExecutionDataSchema = z.object({
  /** The importExecutionId of the import */
  importExecutionId: z.string(),
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
  body: z.record(z.string(), z.any()).optional(),
});

export type SubmitImportExecutionData = z.input<typeof SubmitImportExecutionDataSchema>;
