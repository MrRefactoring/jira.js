import { z } from 'zod';

export const GetLatestImportExecutionStatusSchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
});

export type GetLatestImportExecutionStatus = z.input<typeof GetLatestImportExecutionStatusSchema>;
