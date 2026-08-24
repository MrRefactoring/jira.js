import { z } from 'zod';

export const GetImportExecutionStatusSchema = z.object({
  /** The importExecutionId of the import */
  importExecutionId: z.string(),
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
});

export type GetImportExecutionStatus = z.input<typeof GetImportExecutionStatusSchema>;
